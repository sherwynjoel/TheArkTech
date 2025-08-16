import type { APIRoute } from "astro";
import { z } from "zod";
import { saveSubmission } from "../../lib/db";
import nodemailer from "nodemailer";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  projectType: z.string().min(2),
  budget: z.string().optional(),
  message: z.string().max(2000).optional(),
  website: z.string().max(0).optional(), // honeypot
});

function mailTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();

  // honeypot: bots fill hidden "website" field
  if ((form.get("website") as string)?.trim()) {
    return new Response("ok", { status: 200 });
  }

  const data = Object.fromEntries(form) as Record<string, string>;
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), { status: 400 });
  }
  const payload = parsed.data;

  // Save to SQLite
  saveSubmission(payload);

  // Send emails if SMTP envs are set
  const transporter = mailTransport();
  if (transporter) {
    const toOwner = process.env.NOTIFY_TO || process.env.SMTP_USER!;
    await transporter.sendMail({
      from: process.env.MAIL_FROM || `The Ark Tech <no-reply@thearktech.in>`,
      to: toOwner,
      subject: `New project request: ${payload.projectType} — ${payload.name}`,
      html: `
        <h2>New Project Request</h2>
        <p><b>Name:</b> ${payload.name}</p>
        <p><b>Email:</b> ${payload.email}</p>
        <p><b>Phone:</b> ${payload.phone}</p>
        <p><b>Type:</b> ${payload.projectType}</p>
        <p><b>Budget:</b> ${payload.budget || "-"}</p>
        <p><b>Message:</b><br/>${(payload.message || "").replace(/\n/g,"<br/>")}</p>
      `,
      text: `New request from ${payload.name} (${payload.email}, ${payload.phone}) — ${payload.projectType}. Budget: ${payload.budget || "-"}.\n\n${payload.message || ""}`,
    });

    // Auto-confirm to client
    await transporter.sendMail({
      from: process.env.MAIL_FROM || `The Ark Tech <no-reply@thearktech.in>`,
      to: payload.email,
      subject: "We received your project request",
      html: `
        <p>Hi ${payload.name},</p>
        <p>Thanks for contacting <b>The Ark Tech</b>. We’ve received your request for <b>${payload.projectType}</b>. Our team will reach out within 1 business day.</p>
        <p>— The Ark Tech</p>
      `,
      text: `Hi ${payload.name}, we received your request for ${payload.projectType}. We'll respond within 1 business day. — The Ark Tech`,
    });
  }

  // Redirect to thank you page
  return redirect("/thank-you", 303);
};

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    // Honeypot check (anti-bot)
    const website = formData.get('website');
    if (website) {
      return new Response(JSON.stringify({ success: false, message: 'Bot detected' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const projectType = formData.get('projectType')?.toString() || '';
    const budget = formData.get('budget')?.toString() || '';
    const message = formData.get('message')?.toString() || '';

    // Validate required fields
    if (!name || !email || !phone || !projectType) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get SMTP configuration from environment variables
    const smtpHost = import.meta.env.SMTP_HOST;
    const smtpPort = import.meta.env.SMTP_PORT ? parseInt(import.meta.env.SMTP_PORT) : 587;
    const smtpSecure = import.meta.env.SMTP_SECURE === 'true';
    const smtpUser = import.meta.env.SMTP_USER;
    const smtpPass = import.meta.env.SMTP_PASS;
    const smtpFrom = import.meta.env.SMTP_FROM || smtpUser;
    const smtpTo = import.meta.env.SMTP_TO || smtpUser;

    // Check if SMTP is configured
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('SMTP configuration missing. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env file');
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Email service not configured. Please contact the administrator.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email content
    const emailSubject = `New Quote Request from ${name}`;
    const emailBody = `
New quote request received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Project Type: ${projectType}
Budget: ${budget || 'Not specified'}
Message:
${message}

---
This email was sent from the contact form on TheArkTech website.
    `.trim();

    // Send email
    await transporter.sendMail({
      from: smtpFrom,
      to: smtpTo,
      subject: emailSubject,
      text: emailBody,
      replyTo: email,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you! Your request has been submitted successfully.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'An error occurred while sending your message. Please try again later.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};


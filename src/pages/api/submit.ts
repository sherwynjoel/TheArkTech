import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const requirement = formData.get('requirement')?.toString() || '';

    // Validate required fields
    if (!name || !email || !phone || !requirement) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/?error=validation&fields=' + 
            [(!name && 'name'), (!email && 'email'), (!phone && 'phone'), (!requirement && 'requirement')]
              .filter(Boolean).join(',')
        }
      });
    }

    // Get SMTP configuration from environment variables
    // In Astro, use import.meta.env for server-side variables
    const smtpHost = import.meta.env.SMTP_HOST || process.env.SMTP_HOST;
    const smtpPort = (import.meta.env.SMTP_PORT || process.env.SMTP_PORT) ? parseInt(import.meta.env.SMTP_PORT || process.env.SMTP_PORT || '587') : 587;
    const smtpSecure = (import.meta.env.SMTP_SECURE || process.env.SMTP_SECURE) === 'true';
    const smtpUser = import.meta.env.SMTP_USER || process.env.SMTP_USER;
    const smtpPass = import.meta.env.SMTP_PASS || process.env.SMTP_PASS;
    const smtpFrom = import.meta.env.SMTP_FROM || process.env.SMTP_FROM || smtpUser;
    const smtpTo = import.meta.env.SMTP_TO || process.env.SMTP_TO || smtpUser;

    // Debug logging (remove in production)
    console.log('SMTP Config Check:', {
      hasHost: !!smtpHost,
      hasUser: !!smtpUser,
      hasPass: !!smtpPass,
      port: smtpPort,
      secure: smtpSecure
    });

    // Check if SMTP is configured
    if (!smtpHost || !smtpUser || !smtpPass) {
      const missing = [];
      if (!smtpHost) missing.push('SMTP_HOST');
      if (!smtpUser) missing.push('SMTP_USER');
      if (!smtpPass) missing.push('SMTP_PASS');
      
      console.error('SMTP configuration missing:', missing);
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/?error=server&reason=env&missing=${missing.join(',')}`
        }
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
      // Add TLS options for STARTTLS
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      throw new Error(`SMTP connection failed: ${verifyError instanceof Error ? verifyError.message : 'Unknown error'}`);
    }

    // Email content
    const emailSubject = `New Contact Form Submission from ${name}`;
    const emailBody = `
New contact form submission received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Requirement/Query:
${requirement}

---
This email was sent from the contact form on TheArkTech website.
    `.trim();

    // Send email
    const info = await transporter.sendMail({
      from: smtpFrom,
      to: smtpTo,
      subject: emailSubject,
      text: emailBody,
      replyTo: email,
    });
    
    console.log('Email sent successfully:', info.messageId);

    // Redirect to success page
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/?submitted=1'
      }
    });

  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Full error details:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    });
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/?error=server&reason=send'
      }
    });
  }
};


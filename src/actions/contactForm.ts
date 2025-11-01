"use server"

import nodemailer from 'nodemailer';

export async function submitContactForm({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean }> {
  try {
    // Create transporter for Amazon SES
    const transporter = nodemailer.createTransport({
      host: process.env.SES_HOST || 'email-smtp.us-east-1.amazonaws.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.SES_FROM_EMAIL || process.env.SES_USER,
      to: 'office@hefesgroup.com',
      subject: `Kiddly - Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
} 
import nodemailer from 'nodemailer';

export interface sendEmailParams {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}) {
  const { to, subject, html } = params;
  if (!process.env.SMTP_EMAIL) {
    return;
  }
  try {
    return await transporter.sendMail({
      from: `Magnetic Travel <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    });
  } catch (err) {
    throw new Error(err as string);
  }
}

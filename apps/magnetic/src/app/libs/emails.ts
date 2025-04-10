import nodemailer from 'nodemailer';

export interface sendEmailParams {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: 'mail.magnetic-travel.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  cc?: string;
}) {
  const { to, subject, html, cc } = params;
  if (!process.env.SMTP_EMAIL) {
    return;
  }
  try {
    return await transporter.sendMail({
      from: `Magnetic Travel <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
      cc: process.env.EMAIL_COPY,
    });
  } catch (err) {
    console.log('error sending email: ', err);
    throw new Error(err as string);
  }
}

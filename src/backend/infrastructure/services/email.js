import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export const VARIABLES = {
  APP_NAME: "Sebastian Agudelo",
  APP_URL_FRONT: "https://www.jhonsebastianas.com",
  LINK_INSTAGRAM: "https://www.instagram.com/sebastianagudelodev",
  LINK_LINKEDIN: "https://www.linkedin.com/in/jhonsabastianas/",
  LINK_WEB: "https://www.jhonsebastianas.com",
  LINK_YOUTUBE: "https://www.youtube.com/@jhonsebastianas",
};

export async function sendEmailByTemplate({ template, subject, to, parameters }) {
  const html = await buildTemplate(template, parameters);
  return await sendMail(subject, html, to);
}

async function buildTemplate(templateName, parameters) {
  const templatePath = path.join(process.cwd(), 'public', 'templates', `${templateName}.html`);
  let html = fs.readFileSync(templatePath, 'utf8');

  html = html.replace(/{APP_NAME}/g, VARIABLES.APP_NAME);
  html = html.replace(/{URL_FRONTEND}/g, VARIABLES.APP_URL_FRONT);

  for (const [key, value] of Object.entries(parameters)) {
    html = html.replace(new RegExp(`{${key}}`, 'gi'), value);
  }

  return html;
}

async function sendMail(subject, htmlContent, recipientEmails) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const info = await transporter.sendMail({
    from: `'${VARIABLES.APP_NAME}' <${process.env.EMAIL_USERNAME}>`,
    to: recipientEmails,
    subject,
    html: htmlContent
  });

  console.log("Correo enviado:", info.messageId);
}

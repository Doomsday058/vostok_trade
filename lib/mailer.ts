import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

const PRICE_LIST_PATH = path.join(process.cwd(), 'public', 'price.xlsx');

export async function sendPriceByEmail(toEmail: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb;">
      <h1 style="color: #1f2937; text-align: center;">VOSTOK TRADE COMPANY</h1>
      <p>Благодарим за интерес к нашей продукции. Актуальный прайс-лист во вложении.</p>
      <p>С уважением,<br>Команда VOSTOK TRADE</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"VOSTOK TRADE" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Прайс-лист продукции',
    html: htmlContent,
    attachments: [
      {
        filename: 'price-list.xlsx',
        path: PRICE_LIST_PATH,
      },
    ],
  });
}
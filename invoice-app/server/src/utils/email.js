const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

async function sendInvoiceEmail({ to, subject, text, invoice, pdfBuffer }) {
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html: `<p>${text}</p><p><strong>Invoice:</strong> ${invoice.invoiceNumber}</p>`,
    attachments: [{ filename: `invoice-${invoice.invoiceNumber}.pdf`, content: pdfBuffer }]
  });
}

module.exports = { sendInvoiceEmail };
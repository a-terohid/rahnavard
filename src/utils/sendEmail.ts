import nodemailer from "nodemailer";

/**
 * Sends an email using Nodemailer with Gmail SMTP.
 * @param to - Recipient's email address
 * @param subject - Subject of the email
 * @param text - Plain text content of the email
 */


const sendEmail = async (to: string, subject: string, text: string) => {
  // Create a transporter object for sending emails
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP server
    port: 465, // Port for SSL
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER, // Gmail account email (from environment variables)
      pass: process.env.EMAIL_PASS, // Gmail account app password (from environment variables)
    },
  });

  // Send the email
  await transporter.sendMail({
    from: `"Real Estate" <${process.env.EMAIL_USER}>`, // Sender info
    to, // Recipient email
    subject, // Email subject
    text, // Plain text body
  });
};

export default sendEmail;
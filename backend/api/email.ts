import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service here
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string // Consider using an app-specific password for security
  }
});

const sendEmail = async (name: string, email: string, message: string): Promise<boolean> => {
  const mailOptions: nodemailer.SendMailOptions = { 
    from: process.env.EMAIL_USER as string,
    to: process.env.EMAIL_USER as string,
    subject: 'New Message Received',
    text: `Sender: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    html: `<p>Sender: ${name}</p><p>Email: ${email}</p><p>Message:</p><p>${message}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

export default sendEmail;
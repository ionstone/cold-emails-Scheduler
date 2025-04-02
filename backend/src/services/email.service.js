import nodemailer from "nodemailer";
import { AppError } from "../utils/AppError.js";

class EmailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    });
  }

  async sendEmail({ to, subject, text }) {
    try {
      const mailOptions = {
        from: process.env.USER,
        to,
        text,
        subject,
      };

      const info = await this.transport.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      return info;
    } catch (error) {
      throw new AppError('Failed to send email', 500);
    }
  }
}

export const emailService = new EmailService(); 
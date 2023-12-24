import { Transporter, createTransport } from "nodemailer";
import { UserDocument } from "../models/user.model";
import config from "config";

export default class MailSender {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: config.get<string>("SMTP_HOST"),
      port: config.get<number>("SMTP_PORT"),
      auth: {
        user: config.get<string>("SMTP_USERNAME"),
        pass: config.get<string>("SMTP_PASSWORD"),
      },
    });
  }

  async sendResetPasswordEmail(user: UserDocument, resetToken: string) {
    try {
      await this.transporter.sendMail({
        from: config.get<string>("SMTP_FROM"),
        to: user.email,
        subject: "Password Reset",
        html: `<h3>Click below to reset your password</h3>
        <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">${process.env.FRONTEND_URL}/reset-password?token=${resetToken}</a>`,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Something went wrong");
      }
    }
  }
}

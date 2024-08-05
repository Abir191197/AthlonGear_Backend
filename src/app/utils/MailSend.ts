import nodemailer from "nodemailer";
import winston from "winston";
import config from "../../config";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const sendMail = async (from: string, to: any, subject: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: config.MAIL_HOST,
      auth: {
        user: config.MAIL_USERNAME,
        pass: config.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: html,
    };

    logger.info(`Sending mail to - ${to}`);

    const info = await transporter.sendMail(mailOptions);
    logger.info("Email sent: " + info.response);
  } catch (error) {
    logger.error(error);
  }
};

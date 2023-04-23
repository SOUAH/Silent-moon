import nodemailer from "nodemailer";
import config from "./env/config";
import Logger from "./logger";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email,
    pass: config.password,
  },
});

//send an email to a user
export async function sendEmail(
  email: string,
  emailText: string,
  emailSubject: string
) {
  try {
    const mailOptions = {
      from: config.email,
      to: email,
      subject: emailSubject,
      text: emailText,
    };

    await transporter.sendMail(mailOptions); //just send an email

    Logger.info(`Email sent to ${email}`);
  } catch (error) {
    Logger.error(
      `Error found in ${__filename} - send email method: ${error.message}`
    );
    throw error;
  }
}

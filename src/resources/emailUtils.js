import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import transporter from "../config/nodeMailer.js";
import {
  DEFAULT_FROM,
  INFO_EMAIL,
  EMAIL_SUBJECT,
  EMAIL_TEMPLATES,
} from "../constants/emailConstants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendOtpEmail = async (recipient, otp, username = "User") => {
  try {
    // Render EJS template
    const templatePath = path.join(
      __dirname,
      "../templates",
      EMAIL_TEMPLATES.VERIFICATION_EMAIL
    );
    const html = await ejs.renderFile(templatePath, { otp, username });

    const mailOptions = {
      title: "Storage Management System",
      from: DEFAULT_FROM,
      to: recipient,
      subject: EMAIL_SUBJECT.VERIFICATION_EMAIL,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

const sendResetPasswordEmail = async (userEmail, resetData) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../templates",
      EMAIL_TEMPLATES.RESET_PASSWORD
    );

    // resetData = { username, resetLink }
    const html = await ejs.renderFile(templatePath, resetData);

    const mailOptions = {
      from: DEFAULT_FROM,
      to: userEmail,
      subject: EMAIL_SUBJECT.RESET_PASSWORD,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Reset password email sent:", result.messageId);
    return result;
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw error;
  }
};

const sendContactUsEmail = async (formData) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../templates",
      EMAIL_TEMPLATES.CONTACT_US
    );

    const html = await ejs.renderFile(templatePath, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      contactNumber: formData.contactNumber,
      subject: formData.subject,
      message: formData.message,
    });

    const mailOptions = {
      from: INFO_EMAIL, // Use authenticated email address (matches EMAIL_USER)
      replyTo: formData.email, // User's email for replies
      to: INFO_EMAIL,
      subject: EMAIL_SUBJECT.CONTACT_US,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Contact Us email sent:", result.messageId);
    return result;
  } catch (error) {
    console.error("Error sending Contact Us email:", error);
    throw error;
  }
};

export {
  sendOtpEmail,
  sendResetPasswordEmail,
  sendContactUsEmail,
};

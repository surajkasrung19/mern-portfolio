import nodemailer from "nodemailer";

export const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    const error = new Error("Missing EMAIL_USER or EMAIL_PASS in environment variables.");
    error.code = "MAIL_CONFIG_MISSING";
    throw error;
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

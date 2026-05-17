import { Router } from "express";
import { isMongoReady } from "../config/database.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { requireMongo } from "../middleware/requireMongo.js";
import ContactMessage from "../models/ContactMessage.js";
import { escapeHtml } from "../utils/escapeHtml.js";
import { createTransporter } from "../utils/mailer.js";

const router = Router();
const contactEmail = process.env.CONTACT_EMAIL || "surajkasrung1904@gmail.com";

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  let savedMessage = null;
  if (isMongoReady()) {
    savedMessage = await ContactMessage.create({ name, email, message });
  }

  try {
    const transporter = createTransporter();
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: contactEmail,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New portfolio message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    if (savedMessage) {
      savedMessage.emailStatus = "sent";
      await savedMessage.save();
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);

    if (savedMessage) {
      savedMessage.emailStatus = "failed";
      await savedMessage.save();
    }

    if (error.code === "MAIL_CONFIG_MISSING") {
      return res.status(500).json({
        error:
          "Email server is missing EMAIL_USER or EMAIL_PASS. Add them to .env and restart npm run server.",
      });
    }

    if (["EAUTH", "EENVELOPE", "ECONNECTION", "ETIMEDOUT"].includes(error.code)) {
      return res.status(500).json({
        error:
          "Email server could not authenticate or connect. Check your Gmail app password in .env.",
      });
    }

    return res.status(500).json({
      error: "Unable to send message right now. Please try again later.",
    });
  }
});

router.get("/admin/contacts", requireAdmin, requireMongo, async (_req, res) => {
  const contacts = await ContactMessage.find().sort({ createdAt: -1 });
  return res.json(contacts);
});

router.delete("/admin/contacts/:id", requireAdmin, requireMongo, async (req, res) => {
  await ContactMessage.findByIdAndDelete(req.params.id);
  return res.json({ ok: true });
});

export default router;

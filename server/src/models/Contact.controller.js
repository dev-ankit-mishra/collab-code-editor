// server/controllers/contact.controller.js
import sgMail from "../config/mailer.js";

export const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const msg = {
      to: process.env.SENDGRID_FROM_EMAIL,       // where you receive mail
      from: process.env.SENDGRID_FROM_EMAIL,     // MUST be verified sender
      subject: `New Contact Message from ${name}`,
      text: `From: ${email}\n\n${message}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    };

    await sgMail.send(msg);

    return res.status(200).json({
      message: "Message sent successfully ✅",
    });
  } catch (error) {
    console.error("SENDGRID ERROR:", error.response?.body || error);
    return res.status(500).json({
      message: "Email service failed",
    });
  }
};

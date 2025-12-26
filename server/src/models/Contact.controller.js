import transporter from "../config/mailer.js";

export const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: message,
    });

    res.json({ message: "Message sent successfully ✅" });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ message: "Failed to send message ❌" });
  }
};

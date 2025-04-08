import { Router } from "express";
import { sendConfirmationEmail } from "../utils/nodemailer.js";
import { validationResult } from "express-validator";
import contactLimiter from "../middlewares/rateLiminting.js"
import validateContact from "../middlewares/validateContact.js";
import sanitizeContact from "../middlewares/sanitizeContact.js";

const routerContact = Router();

routerContact.get("/", (req, res) => {
  res.send("Servidor API funcionando correctamente ✅");
});

routerContact.post("/api/contact",contactLimiter, validateContact, sanitizeContact, async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { firstName, lastName, email, message } = req.body;

  try {
    // ✅ Si pasó el captcha, mandamos el email
    await sendConfirmationEmail({
      email,
      firstName,
      lastName,
      message,
    });

    res.json({ success: true, message: "Correo enviado con éxito." });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ success: false, error: "Error del servidor." });
  }
});

export default routerContact;

import { Router } from "express";
import axios from "axios";
import configObject from "../config/env.js";
import { sendConfirmationEmail } from "../utils/nodemailer.js";
import { validationResult } from "express-validator";
import contactLimiter from "../middlewares/rateLiminting.js"
import validateContact from "../middlewares/validateContact.js";
import sanitizeContact from "../middlewares/sanitizeContact.js";

const routerContact = Router();
// const { RECAPTCHA_SECRET_KEY } = configObject;

routerContact.get("/", (req, res) => {
  res.send("Servidor API funcionando correctamente ✅");
});

routerContact.post("/api/contact",contactLimiter, validateContact, sanitizeContact, async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { firstName, lastName, email, message } = req.body;
  // , token || !token
  // if (!firstName || !lastName || !email || !message) {
  //   return res.status(400).json({ success: false, error: "Datos incompletos" });
  // }

  try {
    // ✅ Verificamos el token de reCAPTCHA con Google
    // const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    // const captchaRes = await axios.post(verifyUrl, null, {
    //   params: {
    //     secret: RECAPTCHA_SECRET_KEY,
    //     response: token,
    //   },
    // });

    // if (!captchaRes.data.success) {
    //   return res.status(400).json({ success: false, error: "Captcha inválido" });
    // }

    // ✅ Si pasó el captcha, mandamos el email
    await sendConfirmationEmail({
      email,
      firstName,
      last_name: lastName,
      message,
    });

    res.json({ success: true, message: "Correo enviado con éxito." });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ success: false, error: "Error del servidor." });
  }
});

export default routerContact;

import { Router } from "express";
const routerContact = Router();
import configObject from '../config/env';
const { RECAPTCHA_SECRET_KEY } = configObject;


import axios from "axios";
import { sendConfirmationEmail } from "../utils/nodemailer.js";

routerContact.post("/api/contact", async (req, res) => {
    const { firstName, lastName, email, message, token } = req.body;
  
    if (!firstName || !lastName || !email || !message || !token) {
      return res.status(400).json({ success: false, error: "Datos incompletos" });
    }
  
    try {
      // ✅ Verificamos el token de reCAPTCHA con Google
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
      const captchaRes = await axios.post(verifyUrl, null, {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        },
      });
  
      if (!captchaRes.data.success) {
        return res.status(400).json({ success: false, error: "Captcha inválido" });
      }
  
      // ✅ Si pasó el captcha, mandamos el email
      await sendConfirmationEmail({ email, firstName });
  
      res.json({ success: true, message: "Correo enviado con éxito." });
    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({ success: false, error: "Error del servidor." });
    }
  });

export default routerContact;
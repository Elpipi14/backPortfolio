import nodemailer from "nodemailer";
import configObject from "../config/env.js";

const { email_user, email_pass } = configObject;

const transporter = nodemailer.createTransport({
  host: "c2670112.ferozo.com",
  port: 465,
  secure: true,
  auth: {
    user: email_user,
    pass: email_pass,
  },
});

export const sendConfirmationEmail = async ({ email, firstName, message, last_name }) => {
  try {
    const sentMailOptions = {
      from: `"Piuzzi Dev" <${email_user}>`,
      to: email,
      subject: "Gracias por ponerte en contacto conmigo",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2>¡Gracias por tu mensaje, ${firstName}!</h2>
          <p>He recibido tu consulta y la estaré revisando en breve.</p>
          <p>Si tu mensaje requiere una respuesta, me pondré en contacto contigo lo antes posible.</p>
          <br/>
          <p>Saludos cordiales,</p>
          <p><strong>Andrés Piuzzi</strong><br/>Desarrollador Web</p>
        </div>
      `,
    };

    const mailOptions = {
      from: email_user,
      to: email_user,
      subject: "Envío de nuevo formulario de contacto",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
          <h3 style="color: #4CAF50; text-align: center;">Nuevo contacto desde el sitio web</h3>
          <p style="color: #333; font-size: 1.1em;">Has recibido un nuevo formulario de contacto. Aquí están los datos:</p>
          <div style="background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin: 20px 0;">
              <p><strong>Nombre:</strong> ${firstName}</p>
              <p><strong>Apellido:</strong> ${last_name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Mensaje:</strong> ${message}</p>
          </div>
        </div>
      `,
    };

    // Enviar a vos primero
    await transporter.sendMail(mailOptions);
    console.log("Correo recibido por Piuzzi Dev");

    // Enviar confirmación al cliente
    await transporter.sendMail(sentMailOptions);
    console.log("Correo de confirmación enviado al cliente");

    return { success: true };
  } catch (error) {
    console.error("Error al enviar correos:", error);
    return { success: false, error };
  }
};

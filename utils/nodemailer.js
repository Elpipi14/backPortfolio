import nodemailer from "nodemailer";
import configObject from "../config/env.js";

const { email_user, email_pass } = configObject;

// Configurar el transporte de Nodemailer
const transporter = nodemailer.createTransport({
  service: "smtp.donweb.com",
  port: 465,
  secure:true,
  auth: {
    user: email_user,
    pass: email_pass,
    tls: {
      rejectUnauthorized: false, // en caso de problemas con certificados SSL autofirmados
    },
  },
});

export const sendConfirmationEmail = async ({ email, firstName }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Piuzzi Dev" <${email_user}>`,
      to: email,
      subject: "Gracias por ponerte en contacto conmigo",
      text: `Hola ${firstName}, gracias por tu mensaje. Me estaré comunicando pronto.`,
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
    });

    console.log("Correo enviado: ", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
};

export default transporter;

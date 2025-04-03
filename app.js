// Importa express para crear la aplicación web
import express from "express";

//cors sirve para permitir el acceso a la API desde el frontend
import cors from "cors";

//configObject es un objeto que contiene las variables de entorno
import configObject from "./config/env.js";
const { page, port } = configObject;

//Ruta contacto para manejar el envío de correos electrónicos
import routerContact from "./routes/contact.js";

// servicio de nodemailer
import { sendConfirmationEmail } from "./utils/nodemailer.js";

const app = express();

// Middleware sirve para procesar las peticiones antes de llegar a las rutas
app.use(express.json());
app.use(
  cors({
    origin: page,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/", routerContact);

// ==============================
// 🔐 Servidor HTTP
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

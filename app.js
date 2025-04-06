// Importa express para crear la aplicación web
import express from "express";

//cors sirve para permitir el acceso a la API desde el frontend
import cors from "cors";

//configObject es un objeto que contiene las variables de entorno
import configObject from "./config/env.js";
const { page, page2, page3, port } = configObject;

//Ruta contacto para manejar el envío de correos electrónicos
import routerContact from "./routes/contact.js";

const app = express();

// ✅ Confía en el proxy para obtener la IP real del cliente
app.set("trust proxy", 1);

// Middleware
const allowedOrigins = [page, page2, page3].filter(Boolean); // solo strings válidas
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware sirve para procesar las peticiones antes de llegar a las rutas
app.use(express.json());

console.log("🧪 Cors permitido para:", page, page2, page3);

app.use("/", routerContact);

// ==============================
// 🔐 Servidor HTTP
// ==============================

const PORT = port;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

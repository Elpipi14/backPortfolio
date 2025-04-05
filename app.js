// Importa express para crear la aplicación web
import express from "express";

//cors sirve para permitir el acceso a la API desde el frontend
import cors from "cors";

//configObject es un objeto que contiene las variables de entorno
import configObject from "./config/env.js";
const { page, page2, port } = configObject;

//Ruta contacto para manejar el envío de correos electrónicos
import routerContact from "./routes/contact.js";


const app = express();

// Middleware sirve para procesar las peticiones antes de llegar a las rutas
app.use(express.json());

// Middleware
const corsOptions = {
 origin: [`${page}`, `${page2}`], // Permite HTTP y HTTPS
  credentials: true, // Si necesitas enviar cookies o autenticación
};

console.log("🧪 Cors permitido para:", page, page2);
app.use(cors(corsOptions));


app.use("/", routerContact);

app.get("/", (req, res) => {
  res.send("Servidor API funcionando correctamente ✅");
});

// ==============================
// 🔐 Servidor HTTP
// ==============================

const PORT = port;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

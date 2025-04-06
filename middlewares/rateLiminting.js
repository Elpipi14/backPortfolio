import rateLimit from "express-rate-limit";

const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 3, // máximo 3 envíos por minuto
  message: {
    success: false,
    error: "Demasiadas solicitudes. Por favor intentá más tarde.",
  },
});

export default contactLimiter;
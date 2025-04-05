import { check } from "express-validator";

export const validateContact = [
  check("firstName").notEmpty().withMessage("Nombre requerido"),
  check("lastName").notEmpty().withMessage("Apellido requerido"),
  check("email").isEmail().withMessage("Email inválido"),
  check("message").isLength({ min: 10 }).withMessage("Mensaje muy corto"),
];


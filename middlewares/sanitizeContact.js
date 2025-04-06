import validator from "validator";

const sanitizeContact = (req, res, next) => {
  const { firstName, lastName, email, message } = req.body;

  req.body.firstName = validator.escape(firstName.trim());
  req.body.lastName = validator.escape(lastName.trim());
  req.body.email = validator.normalizeEmail(email.trim()); // Normaliza y valida
  req.body.message = validator.escape(message.trim());

  next();
};

export default sanitizeContact;

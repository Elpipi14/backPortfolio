import dotenv from "dotenv";
dotenv.config();

const configObject = {
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  page: process.env.PAGE,
  port: process.env.PORT || 5000,
};

export default configObject;

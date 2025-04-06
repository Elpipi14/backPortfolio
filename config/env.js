import dotenv from "dotenv";
dotenv.config();

const configObject = {
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  page: process.env.PAGE,
  page2: process.env.PAGE2,
  page3: process.env.PAGE3,
  page4: process.env.PAGE4,
  port: process.env.PORT || 8080,
};

export default configObject;

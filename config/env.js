import dotenv from "dotenv";
dotenv.config();

const configObject = {
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  page: process.env.PAGE,
  page2: process.env.PAGE2,
  page3: process.env.PAGE3,
  port: process.env.PORT || 8080,
};

console.log("🌱 Railway env directamente:");
console.log("PAGE:", process.env.PAGE);
console.log("PAGE2:", process.env.PAGE2);
console.log("PAGE3:", process.env.PAGE3);

export default configObject;

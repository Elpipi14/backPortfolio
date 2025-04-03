import dotenv from "dotenv";
dotenv.config();

const configObject = {

    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
    page: process.env.PAGE,
    port: process.env.PORT,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
 
};

export default configObject;
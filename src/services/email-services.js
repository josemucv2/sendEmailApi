import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = createTransport({
  service: "Gmail", // o cualquier otro proveedor de correo
  auth: {
    user: process.env.API_EMAIL,
    pass: process.env.API_KEY_PASS_EMAIL,
  },
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "https://jmdevv2.vercel.app",
  "https://jmdevv2.vercel.app/contact",
  "https://send-email-api-ten.vercel.app/",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin, "origin");
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido por CORS"));
    }
  },
  methods: "POST",
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

// Configura el transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // o cualquier otro proveedor de correo
  auth: {
    user: process.env.API_EMAIL,
    pass: process.env.API_KEY_PASS_EMAIL,
  },
});

app.post("/send-email", async (req, res) => {
  const { from, subject, text, name } = req.body;

  const mailOptions = {
    from: from,
    to: process.env.API_EMAIL,
    subject: `Nuevo mensaje de ${name} ASUNTO: ${subject}`,
    text: `${text} \n\nEnviado por ${from}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente");
    res.send("Correo enviado correctamente.");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send("Error al enviar el correo.");
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

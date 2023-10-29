import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import { urlencoded, json as _json } from "body-parser";
import router from "./router";

dotenv.config();
const app = express();
const port = 3000;

app.use(json());

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "https://jmdevv2.vercel.app",
  "https://jmdevv2.vercel.app/contact",
  "https://send-email-api-josemucv2.vercel.app",
  "https://send-email-api-ten.vercel.app",
  "https://send-email-api-omega.vercel.app",
  "https://jmdevv2-josemucv2.vercel.app",
  "https://send-email-api-flame.vercel.app/api",
  "https://send-email-api-flame.vercel.app",
  "https://josemartinezcode.com",
  "https://josemartinezcode.com/contact",
  "https://send-email-api-v2.vercel.app",
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

app.use(urlencoded({ extended: false }));
app.use(_json());
app.use(cors(corsOptions));
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("api send email succes");
});

// Configura el transporter de nodemailer

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

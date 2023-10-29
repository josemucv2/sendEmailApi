import { transporter } from "../services/email-services";

const sendEmail = async (req, res) => {
  const { from, subject, text, name } = req.body;

  const mailOptions = {
    from: from,
    to: process.env.API_EMAIL,
    subject: `Nuevo mensaje de ${name} ASUNTO: ${subject}`,
    text: `${text} \n\nEnviado por ${from}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Correo enviado correctamente.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al enviar el correo.");
  }
};

export default {
  sendEmail,
};

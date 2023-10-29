import routerx from "express-promise-router";
import sendEmailController from "../controllers/send-email";

const router = routerx();

router.post("/send-email", sendEmailController.sendEmail);

export default router;

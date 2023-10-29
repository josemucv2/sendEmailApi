import routerx from "express-promise-router";
import sendEmailRouter from "../router/send-email";

const router = routerx();
router.use("/", sendEmailRouter);
export default router;

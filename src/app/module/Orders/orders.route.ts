// const from = "malam191197@bscse.uiu.ac.bd";
// const to = "ardhrubo908@gmail.com";
// const subject = "Test Email";
// const html = "<p>This is a test email</p>";

//    sendMail(from, to, subject, html)
//   .then(() => console.log("Email sending initiated"))
//   .catch((error: any) => console.error("Email sending failed", error));

import express from "express";
import { OrderControllers } from "./orders.controller";
const router = express.Router();

router.post(
  "/createOrder", 
  // authVerify Added Later
OrderControllers.OrderCreate



)

export const OrdersRoutes = router;
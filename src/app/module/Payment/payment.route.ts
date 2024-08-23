import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();


router.post("/confirmation", PaymentController.confirmationPayment);

export const PaymentRoutes = router;

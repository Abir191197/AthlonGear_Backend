import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync"; // Ensure catchAsync is correctly implemented
import { paymentServices } from "./payment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const confirmationPayment = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.query;

  console.log(`Processing payment confirmation for orderId: ${orderId}`);

  // Call the service to get the confirmation template
  const result = await paymentServices.confirmationService(orderId as string);

 sendResponse(res, {
   statusCode: httpStatus.OK,
   success: true,
   message: "Payment Complete",
   data: result,
 });
});

export const PaymentController = {
  confirmationPayment,
};

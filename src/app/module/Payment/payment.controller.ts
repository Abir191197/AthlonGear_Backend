import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync"; // Ensure catchAsync is correctly implemented
import { paymentServices } from "./payment.service";

const confirmationPayment = catchAsync(async (req: Request, res: Response) => {
  const { orderId, status } = req.query;

console.log(status);
  // Call the service to get the confirmation template
  const result = await paymentServices.confirmationService(
    orderId as string, // `orderId` is not validated here, just passed directly
    status as string
  );

  
 
  res.send(result);
});

export const PaymentController = {
  confirmationPayment,
};

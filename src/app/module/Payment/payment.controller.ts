import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync"; // Ensure catchAsync is correctly implemented
import { paymentServices } from "./payment.service";

const confirmationPayment = catchAsync(async (req: Request, res: Response) => {
  const { orderId, status } = req.query;

  // Validate status parameter
  if (!status || (status !== "success" && status !== "failed")) {
    return res.status(400).json({ message: "Invalid or missing status" });
  }

  // Call the service to get the confirmation template
  const result = await paymentServices.confirmationService(
    orderId as string, // `orderId` is not validated here, just passed directly
    status as string
  );

  // Send the result as the response
  res.setHeader("Content-Type", "text/html");
  res.send(result);
});

export const PaymentController = {
  confirmationPayment,
};

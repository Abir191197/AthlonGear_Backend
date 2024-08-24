import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync"; // Ensure catchAsync is correctly implemented
import { paymentServices } from "./payment.service";

const confirmationPayment = catchAsync(async (req: Request, res: Response) => {
  const { orderId,status } = req.query;

  try {
    // Call the service to get the confirmation template
    const result = await paymentServices.confirmationService(
      orderId as string,
      status as string,
    );

    // Set content-type to HTML
    res.setHeader("Content-Type", "text/html");

    // Send the HTML response
    res.send(result);
  } catch (error) {
    console.error("Error in confirmationPayment:", error);
    res
      .status(500)
      .send("An error occurred while processing your payment confirmation.");
  }
});

export const PaymentController = {
  confirmationPayment,
};

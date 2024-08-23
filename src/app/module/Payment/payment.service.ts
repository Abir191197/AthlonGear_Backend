import { readFileSync } from "fs";
import { join } from "path";
import OrderDetailsModel from "../Orders/orders.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (orderId: string) => {
  try {
    // Verify the payment status using the transaction/order ID
    const verifyResponse = await verifyPayment(orderId);

    let statusMessage = "Payment not successful or not found"; // Default status message
    let templateFile = "ConfirmationFailure.html"; // Default template for failure

    if (verifyResponse.pay_status === "Successful") {
      // Update the payment status in the database
      await OrderDetailsModel.findOneAndUpdate(
        { orderId },
        { paymentStatus: "Paid" },
        { new: true } // Option to return the updated document
      );

      statusMessage = "Payment successful"; // Update the status message on success
      templateFile = "ConfirmationSuccess.html"; // Template for success
    }

    // Read and modify the HTML template
    const filePath = join(__dirname, `../../../views/${templateFile}`);
    let template;

    try {
      template = readFileSync(filePath, "utf-8");
    } catch (fileError) {
      console.error("Error reading template file:", fileError);
      throw new Error("Template file not found");
    }

    // Replace placeholder in the template
    template = template.replace("{{message}}", statusMessage);

    return template;
  } catch (error) {
    console.error("Error in confirmationService:", error);
    throw new Error("Failed to confirm payment");
  }
};

export const paymentServices = {
  confirmationService,
};

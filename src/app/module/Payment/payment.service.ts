import { readFileSync } from "fs";
import { join } from "path";
import OrderDetailsModel from "../Orders/orders.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (orderId: string, status: string) => {
  try {
   
    // Verify the payment status using the transaction/order ID
    const verifyResponse = await verifyPayment(orderId);
    

    let statusMessage;
    let templateFile;

    // Use the passed 'status' parameter to determine the flow
    if (status === "success" && verifyResponse.pay_status === "Successful") {
      statusMessage = "Payment successful"; // Update the status message on success
      templateFile = "ConfirmationSuccess.html"; // Template for success

      // Update the payment status in the database
      await OrderDetailsModel.findOneAndUpdate(
        { orderId },
        { paymentStatus: "Paid" }
      );
    } else if (status === "failed" || verifyResponse.pay_status === "Failed") {
      statusMessage = "Payment failed"; // Update the status message on failure
      templateFile = "ConfirmationFailure.html"; // Template for failure

      // Update the payment status to "Failed" in the database
      await OrderDetailsModel.findOneAndUpdate(
        { orderId },
        { paymentStatus: "Failed" }
      );
    } else {
      throw new Error("Unexpected payment status or response");
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

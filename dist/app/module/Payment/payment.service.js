"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const orders_model_1 = __importDefault(require("../Orders/orders.model"));
const payment_utils_1 = require("./payment.utils");
const confirmationService = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verify the payment status using the transaction/order ID
        const verifyResponse = yield (0, payment_utils_1.verifyPayment)(orderId);
        let statusMessage;
        let templateFile;
        // Use the passed 'status' parameter to determine the flow
        if (status === "success" && verifyResponse.pay_status === "Successful") {
            statusMessage = "Payment successful"; // Update the status message on success
            templateFile = "ConfirmationSuccess.html"; // Template for success
            // Update the payment status in the database
            yield orders_model_1.default.findOneAndUpdate({ orderId }, { paymentStatus: "Paid" });
        }
        else if (verifyResponse.pay_status === "Failed") {
            statusMessage = "Payment failed"; // Update the status message on failure
            templateFile = "ConfirmationFailure.html"; // Template for failure
            // Update the payment status to "Failed" in the database
            yield orders_model_1.default.findOneAndUpdate({ orderId }, { paymentStatus: "Failed" });
        }
        else {
            throw new Error("Unexpected payment status or response");
        }
        // Read and modify the HTML template
        const filePath = (0, path_1.join)(__dirname, `../../../views/${templateFile}`);
        let template;
        try {
            template = (0, fs_1.readFileSync)(filePath, "utf-8");
        }
        catch (fileError) {
            console.error("Error reading template file:", fileError);
            throw new Error("Template file not found");
        }
        // Replace placeholder in the template
        template = template.replace("{{message}}", statusMessage);
        return template;
    }
    catch (error) {
        console.error("Error in confirmationService:", error);
        throw new Error("Failed to confirm payment");
    }
});
exports.paymentServices = {
    confirmationService,
};

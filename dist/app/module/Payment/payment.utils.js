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
exports.sendPaymentRequest = sendPaymentRequest;
exports.verifyPayment = verifyPayment;
const axios_1 = __importDefault(require("axios")); // Use this line only if running in a Node.js environment
const config_1 = __importDefault(require("../../../config"));
const url = config_1.default.PAYMENT_URL;
const headers = {
    "Content-Type": "application/json",
};
function sendPaymentRequest(paymentData) {
    return __awaiter(this, void 0, void 0, function* () {
        // Construct the payload dynamically
        const payload = {
            store_id: config_1.default.STORE_ID,
            signature_key: config_1.default.SIGNATURE_KEY,
            tran_id: paymentData.orderId,
            success_url: `https://athlon-gear-backend.vercel.app/api/payment/confirmation?orderId=${paymentData.orderId}&status=success`,
            fail_url: `https://athlon-gear-backend.vercel.app/api/payment/confirmation?orderId=${paymentData.orderId}&status=failed`,
            cancel_url: "https://athlon-gear.vercel.app/",
            amount: paymentData.orderData.orderTotal.toFixed(2),
            currency: "BDT", // Assuming BDT as currency, adjust if needed
            desc: "Order Payment",
            cus_name: `${paymentData.orderData.contactForm.firstName} ${paymentData.orderData.contactForm.lastName}`,
            cus_email: paymentData.orderData.contactForm.email,
            cus_add1: paymentData.orderData.contactForm.Address,
            cus_add2: paymentData.orderData.contactForm.Apartment,
            cus_city: paymentData.orderData.contactForm.City,
            cus_state: paymentData.orderData.contactForm.State,
            cus_postcode: paymentData.orderData.contactForm.Postal,
            cus_country: paymentData.orderData.contactForm.Country,
            cus_phone: paymentData.orderData.contactForm.Phone.toString(),
            type: "json",
        };
        try {
            const response = yield axios_1.default.post(url, payload, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.error("Error:", error);
            throw error;
        }
    });
}
function verifyPayment(tnxId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${config_1.default.PAYMENT_VERIFY_URL}`; // URL to verify the payment
        try {
            const response = yield axios_1.default.get(url, {
                params: {
                    store_id: config_1.default.STORE_ID,
                    signature_key: config_1.default.SIGNATURE_KEY,
                    type: "json",
                    request_id: tnxId,
                },
            });
            return response.data;
        }
        catch (error) {
            console.error("Payment validation failed:", error);
            throw new Error("Payment validation failed!");
        }
    });
}

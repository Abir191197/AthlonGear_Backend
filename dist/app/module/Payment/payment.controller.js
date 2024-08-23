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
exports.PaymentController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync")); // Ensure catchAsync is correctly implemented
const payment_service_1 = require("./payment.service");
const confirmationPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, status } = req.query;
    // Validate status parameter
    if (!status || (status !== "success" && status !== "failed")) {
        return res.status(400).json({ message: "Invalid or missing status" });
    }
    // Call the service to get the confirmation template
    const result = yield payment_service_1.paymentServices.confirmationService(orderId, // `orderId` is not validated here, just passed directly
    status);
    // Send the result as the response
    res.setHeader("Content-Type", "text/html");
    res.send(result);
}));
exports.PaymentController = {
    confirmationPayment,
};

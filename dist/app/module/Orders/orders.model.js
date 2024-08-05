"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const orderDetailsSchema = new Schema({
    orderId: { type: String, required: true },
    orderTotal: { type: Number, required: true },
    deliveryMethod: {
        title: { type: String, required: true },
        turnaround: { type: String, required: true },
    },
    contactForm: {
        email: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        apartment: { type: String },
        city: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        postal: { type: String, required: true },
        phone: { type: String },
    },
    cartItems: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
            title: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    status: {
        type: String,
        enum: ["processing", "on the way", "delivered"],
        default: "processing",
    },
}, { timestamps: true });
const OrderDetailsModel = mongoose_1.default.model("OrderDetails", orderDetailsSchema, "OrderDetails");
exports.default = OrderDetailsModel;

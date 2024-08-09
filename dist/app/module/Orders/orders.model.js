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
        Address: { type: String, required: true },
        Apartment: { type: String },
        City: { type: String, required: true },
        Country: { type: String, required: true },
        State: { type: String, required: true },
        Postal: { type: String, required: true },
        Phone: { type: String },
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
            price: { type: Number, required: true },
            imageLink: { type: String, required: true }
        },
    ],
    status: {
        type: String,
        enum: ["Order placed", "Processing", "Shipped", "Delivered"],
        default: "Order placed",
    },
    paymentMethods: {
        id: { type: Number, required: true },
        title: { type: String, required: true },
    },
}, { timestamps: true });
const OrderDetailsModel = mongoose_1.default.model("OrderDetails", orderDetailsSchema, "OrderDetails");
exports.default = OrderDetailsModel;

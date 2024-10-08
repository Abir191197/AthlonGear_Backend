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
exports.orderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orders_model_1 = __importDefault(require("./orders.model"));
const products_model_1 = __importDefault(require("../Products/products.model"));
const MailSend_1 = require("../../utils/MailSend");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const payment_utils_1 = require("../Payment/payment.utils");
// Function to generate a simple unique order ID
const generateOrderId = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Extract product IDs from cartItems
        const productIds = orderData.cartItems.map((item) => item.productId);
        const cartItemMap = new Map(orderData.cartItems.map((item) => [
            item.productId.toString(),
            item.quantity,
        ]));
        // Find products in the database
        const products = yield products_model_1.default.find({ _id: { $in: productIds } })
            .session(session)
            .exec();
        // Check if all product IDs are valid
        if (products.length !== productIds.length) {
            throw new Error("One or more product IDs are invalid or do not exist.");
        }
        // Verify stock and update quantities
        for (const product of products) {
            const quantityNeeded = cartItemMap.get(product._id.toString());
            if (!quantityNeeded) {
                throw new Error(`Quantity information missing for product ID: ${product._id}`);
            }
            if (product.stock < quantityNeeded) {
                throw new Error(`Not enough stock for product ID: ${product._id}`);
            }
        }
        // Update stock for each product
        for (const product of products) {
            const quantityNeeded = cartItemMap.get(product._id.toString());
            if (quantityNeeded) {
                yield products_model_1.default.updateOne({ _id: product._id }, { $inc: { stock: -quantityNeeded } }).session(session);
            }
        }
        // Generate a new unique order ID
        const orderId = generateOrderId();
        // Create new OrderDetails instance with the generated order ID
        const order = new orders_model_1.default(Object.assign(Object.assign({}, orderData), { orderId }));
        // Save the order to the database
        yield order.save({ session });
        // Prepare payment data
        const paymentData = {
            orderId,
            orderData,
        };
        // Initiate payment session
        let paymentSession;
        try {
            paymentSession = yield (0, payment_utils_1.sendPaymentRequest)(paymentData);
            console.log("Payment session created:", paymentSession);
        }
        catch (error) {
            console.error("Failed to create payment session:", error);
            throw new Error("Failed to initiate payment session.");
        }
        // Prepare email content
        const toEmail = (_a = order.contactForm) === null || _a === void 0 ? void 0 : _a.email;
        const from = "m.abiralam197@gmail.com";
        const subject = "Order Confirmation";
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        .order-details, .contact-details, .cart-items {
            margin-bottom: 20px;
        }
        .order-details table, .cart-items table {
            width: 100%;
            border-collapse: collapse;
        }
        .order-details th, .cart-items th, .order-details td, .cart-items td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .order-details th, .cart-items th {
            background-color: #f4f4f4;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #000;
            background-color: #54a7ff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Order Confirmation</h1>
        <p>Dear ${(_b = order === null || order === void 0 ? void 0 : order.contactForm) === null || _b === void 0 ? void 0 : _b.firstName},</p>
        <p>Thank you for your order! Below are the details of your order:</p>

        <div class="order-details">
            <h2>Order Details</h2>
            <table>
                <tr>
                    <th>Order ID</th>
                    <td>${order === null || order === void 0 ? void 0 : order.orderId}</td>
                </tr>
                <tr>
                    <th>Order Total</th>
                    <td>$${order === null || order === void 0 ? void 0 : order.orderTotal}</td>
                </tr>
                <tr>
                    <th>Delivery Method</th>
                    <td>${(_c = order === null || order === void 0 ? void 0 : order.deliveryMethod) === null || _c === void 0 ? void 0 : _c.title} (${(_d = order === null || order === void 0 ? void 0 : order.deliveryMethod) === null || _d === void 0 ? void 0 : _d.turnaround})</td>
                </tr>
            </table>
        </div>

        <div class="contact-details">
            <h2>Contact Information</h2>
            <table>
                <tr>
                    <th>Email</th>
                    <td>${(_e = order === null || order === void 0 ? void 0 : order.contactForm) === null || _e === void 0 ? void 0 : _e.email}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>${(_f = order === null || order === void 0 ? void 0 : order.contactForm) === null || _f === void 0 ? void 0 : _f.firstName} ${(_g = order === null || order === void 0 ? void 0 : order.contactForm) === null || _g === void 0 ? void 0 : _g.lastName}</td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>${(_h = order === null || order === void 0 ? void 0 : order.contactForm) === null || _h === void 0 ? void 0 : _h.Address}, ${((_j = order === null || order === void 0 ? void 0 : order.contactForm) === null || _j === void 0 ? void 0 : _j.Apartment) ? ((_k = order === null || order === void 0 ? void 0 : order.contactForm) === null || _k === void 0 ? void 0 : _k.Apartment) + ", " : ""}${(_l = order === null || order === void 0 ? void 0 : order.contactForm) === null || _l === void 0 ? void 0 : _l.City}, ${(_m = order === null || order === void 0 ? void 0 : order.contactForm) === null || _m === void 0 ? void 0 : _m.State}, ${(_o = order === null || order === void 0 ? void 0 : order.contactForm) === null || _o === void 0 ? void 0 : _o.Postal}, ${(_p = order === null || order === void 0 ? void 0 : order.contactForm) === null || _p === void 0 ? void 0 : _p.Country}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>${((_q = order === null || order === void 0 ? void 0 : order.contactForm) === null || _q === void 0 ? void 0 : _q.Phone) || "N/A"}</td>
                </tr>
            </table>
        </div>

        <div class="cart-items">
            <h2>Cart Items</h2>
            <table>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                </tr>
                ${(_r = order === null || order === void 0 ? void 0 : order.cartItems) === null || _r === void 0 ? void 0 : _r.map((item) => `
                <tr>
                    <td>${item === null || item === void 0 ? void 0 : item.title}</td>
                    <td>${item === null || item === void 0 ? void 0 : item.quantity}</td>
                </tr>
                `).join("")}
            </table>
        </div>

        <a href="https://athlon-gear.vercel.app/Orders/TrackOrder" class="button">Track Your Order</a>

        <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>If you have any questions, please contact our support team.</p>
        </div>
    </div>
</body>
</html>
`;
        // Send email
        yield (0, MailSend_1.sendMail)(from, toEmail, subject, html);
        console.log("Order confirmation email sent");
        // Commit transaction
        yield session.commitTransaction();
        session.endSession();
        // Return payment session data
        return paymentSession;
    }
    catch (error) {
        console.error("Error creating order:", error);
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
// Get Single Order from DB
const getSingleOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orders_model_1.default.findOne({
            orderId: id,
        });
        if (!result) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Order Not found");
        }
        return result;
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            throw error;
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to retrieve Order");
        }
    }
});
exports.orderService = {
    createOrderIntoDB,
    getSingleOrderFromDB,
};

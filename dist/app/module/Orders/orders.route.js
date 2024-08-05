"use strict";
// const from = "malam191197@bscse.uiu.ac.bd";
// const to = "ardhrubo908@gmail.com";
// const subject = "Test Email";
// const html = "<p>This is a test email</p>";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
//    sendMail(from, to, subject, html)
//   .then(() => console.log("Email sending initiated"))
//   .catch((error: any) => console.error("Email sending failed", error));
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const router = express_1.default.Router();
router.post("/createOrder", 
// authVerify Added Later
orders_controller_1.OrderControllers.OrderCreate);
exports.OrdersRoutes = router;

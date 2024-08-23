"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../module/auth/auth.route");
const users_route_1 = require("../module/users/users.route");
const products_route_1 = require("../module/Products/products.route");
const orders_route_1 = require("../module/Orders/orders.route");
const payment_route_1 = require("../module/Payment/payment.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: users_route_1.UserRoutes,
    },
    {
        path: "/products",
        route: products_route_1.ProductsRoutes,
    },
    {
        path: "/orders",
        route: orders_route_1.OrdersRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route)); // This will automatically loop your routes that you will add in the moduleRoutes array
exports.default = router;

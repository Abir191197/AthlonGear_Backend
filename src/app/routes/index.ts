import express from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/users/users.route";
import { ProductsRoutes } from "../module/Products/products.route";
import { OrdersRoutes } from "../module/Orders/orders.route";
import { PaymentRoutes } from "../module/Payment/payment.route";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/products",
    route: ProductsRoutes,
  },
  {
    path: "/orders",
    route: OrdersRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route)); // This will automatically loop your routes that you will add in the moduleRoutes array

export default router;

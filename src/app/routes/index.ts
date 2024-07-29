import express from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/users/users.route";
import { ProductsRoutes } from "../module/Products/products.route";


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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route)); // This will automatically loop your routes that you will add in the moduleRoutes array

export default router;

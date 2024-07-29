import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./products.validation";
import { productsControllers } from "./products.controller";

const router = express.Router();

// Create a new product
router.post(
  "/createProduct", // Fixed path to start with '/'
  // authVerify Added Later
  validateRequest(ProductValidation.productValidationSchema),
  productsControllers.ProductCreate
);

// Get all products
router.get(
  "/",
  // authVerify Added Later
  productsControllers.getAllProducts
);

// Get a single product by ID
router.get(
  "/:id",
  // authVerify Added Later
  productsControllers.getSingleProduct
);

// Update a product by ID
router.put(
  "/:id",
  // authVerify Added Later
  productsControllers.updatedProduct
);

export const ProductsRoutes = router;

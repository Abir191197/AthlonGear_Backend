"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const products_validation_1 = require("./products.validation");
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
// Create a new product
router.post("/createProduct", // Fixed path to start with '/'
// authVerify Added Later
(0, validateRequest_1.default)(products_validation_1.ProductValidation.productValidationSchema), products_controller_1.productsControllers.ProductCreate);
// Get all products
router.get("/", 
// authVerify Added Later
products_controller_1.productsControllers.getAllProducts);
// Get a single product by ID
router.get("/:id", 
// authVerify Added Later
products_controller_1.productsControllers.getSingleProduct);
// Update a product by ID
router.put("/:id", 
// authVerify Added Later
products_controller_1.productsControllers.updatedProduct);
exports.ProductsRoutes = router;

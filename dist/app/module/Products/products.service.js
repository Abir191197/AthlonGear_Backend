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
exports.productsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const products_constant_1 = require("./products.constant");
const products_model_1 = __importDefault(require("./products.model"));
// create product into DB
const createProductIntoDB = (ProductData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new products_model_1.default(ProductData);
    yield product.save();
    return product.toObject();
});
//get all  product from db
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    // Ensure the query excludes deleted products
    queryObj.isDeleted = false;
    const productQuery = new QueryBuilder_1.default(products_model_1.default.find(), queryObj)
        .search(products_constant_1.ProductSearchableFields)
        .filter()
        .paginate()
        .sort()
        .fields(); // Chaining
    const result = yield productQuery.modelQuery;
    return result;
});
//get single product from DB
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_model_1.default.findOne({ _id: id });
        if (!result) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
        }
        return result;
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            throw error;
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to retrieve Product");
        }
    }
});
//update or delete form DB
const updatedProductIntoDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    console.log(updateData);
    try {
        // Ensure updateData contains isDeleted
        const updatedProduct = yield products_model_1.default.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true, runValidators: true });
        if (!updatedProduct) {
            throw new Error("Product not found");
        }
        return updatedProduct;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error updating product");
    }
});
exports.productsService = {
    createProductIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updatedProductIntoDB,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, { message: "Title is required" }),
        description: zod_1.z.string().min(20, {
            message: "Description is required",
        }),
        category: zod_1.z.string().min(2, {
            message: "Category is required",
        }),
        brand: zod_1.z.string().min(2, {
            message: "Brand is required",
        }),
        price: zod_1.z.number(),
        //imageLink: z.string(),
        stock: zod_1.z.number(),
    }),
});
exports.ProductValidation = {
    productValidationSchema,
};

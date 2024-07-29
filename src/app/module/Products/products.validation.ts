import { z } from "zod";

const productValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),

    description: z.string().min(20, {
      message: "Description is required",
    }),

    category: z.string().min(2, {
      message: "Category is required",
    }),

    brand: z.string().min(2, {
      message: "Brand is required",
    }),

    price: z.number(),

    //imageLink: z.string(),

    stock: z.number(),
  }),
});


export const ProductValidation = {
  productValidationSchema,
};
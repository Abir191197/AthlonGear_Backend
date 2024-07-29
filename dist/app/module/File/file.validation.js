"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValidation = void 0;
const zod_1 = require("zod");
// Define the Zod schema based on your Mongoose schema
const FileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        type: zod_1.z.enum(["question", "note", "lecture"]),
    }),
});
exports.FileValidation = { FileValidationSchema };

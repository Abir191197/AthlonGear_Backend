"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounselingValidation = void 0;
const zod_1 = require("zod");
// Define the Zod schema based on your Mongoose schema
const CounselingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        Duration: zod_1.z
            .enum(["10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"])
            .transform(Number),
        selectDate: zod_1.z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
        Type: zod_1.z.enum(["online", "offline"]),
        MeetLink: zod_1.z.string().url().optional(),
    }),
});
exports.CounselingValidation = { CounselingValidationSchema };

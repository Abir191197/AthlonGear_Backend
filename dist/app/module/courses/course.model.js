"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    courseName: { type: String, required: true },
    files: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Files" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const CourseModel = (0, mongoose_1.model)("Courses", CourseSchema, "Courses");
exports.default = CourseModel;

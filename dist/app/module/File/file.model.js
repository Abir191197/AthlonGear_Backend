"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    uploadedBy: { type: String, required: true },
    // courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    type: { type: String, enum: ["question", "note", "lecture"], required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const FileModel = (0, mongoose_1.model)("Files", fileSchema, "Files");
exports.default = FileModel;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CounselingSchema = new mongoose_1.Schema({
    createBy: String, // Should match the type 'string' from ICounseling
    Duration: {
        type: Number,
        enum: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        required: true,
    },
    selectDate: { type: Date, required: true },
    Type: { type: String, enum: ["online", "offline"], required: true },
    MeetLink: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const CounselingModel = (0, mongoose_1.model)("Counseling", CounselingSchema, "Counselings");
exports.default = CounselingModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const sendImageToCloud_1 = require("../../utils/sendImageToCloud");
const user_constant_1 = require("../users/user.constant");
const file_controller_1 = require("./file.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const file_validation_1 = require("./file.validation");
const router = express_1.default.Router();
router.post("/file", 
// Authentication middleware (adjust roles as needed)
(0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), 
// File upload middleware (assuming you use multer for file uploads)
sendImageToCloud_1.upload.single("file"), 
// Middleware to parse JSON from form data if necessary
(req, res, next) => {
    if (req.body.data) {
        try {
            req.body = JSON.parse(req.body.data);
        }
        catch (error) {
            return next(error);
        }
    }
    next();
}, (0, validateRequest_1.default)(file_validation_1.FileValidation.FileValidationSchema), file_controller_1.fileUploadController.fileUpload);
router.put("/approve/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin), file_controller_1.fileUploadController.fileApproved);
exports.fileRoutes = router;

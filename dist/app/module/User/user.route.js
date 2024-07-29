"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
// Todo. Everything in this file need to customize according to your requirement
const router = express_1.default.Router();
router.post('/create-student', 
// auth(), // Use it if you apply auth code. No corresponding code is mentioned here. If you do not need it remove it. 
sendImageToCloudinary_1.upload.single('file'), // Use it if you use multer to upload file.
(0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), // This is the middleware to validate req.body using zod. the corresponding code you will find in the validateRequest.ts file inside the middleware folder and user.validation.ts file inside the module folder. 
user_controller_1.UserControllers.createStudent);
//Todo. Create get, post, put, patch, delete etc route as par your requirement. You can read my following blog to get deeper understanding about creating different types of route https://dev.to/md_enayeturrahman_2560e3/how-to-create-api-in-an-industry-standard-app-44ck
exports.UserRoutes = router;

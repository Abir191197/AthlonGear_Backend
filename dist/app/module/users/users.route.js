"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const user_constant_1 = require("./user.constant");
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.get("/me", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student, user_constant_1.USER_ROLE.counsellor), users_controller_1.userControllers.findUser);
router.put("/me", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student, user_constant_1.USER_ROLE.counsellor), users_controller_1.userControllers.updatedUser);
exports.UserRoutes = router;

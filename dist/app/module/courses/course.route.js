"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const user_constant_1 = require("../users/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.post("/create-course", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), (0, validateRequest_1.default)(course_validation_1.CourseValidation.courseValidationSchema), course_controller_1.courseControllers.CourseCreate);
router.get("/", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), course_controller_1.courseControllers.getAllCourse);
router.put("/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), course_controller_1.courseControllers.addCourseInPersonalProfile);
router.get("/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), course_controller_1.courseControllers.getSingleCourse);
exports.CourseRoutes = router;

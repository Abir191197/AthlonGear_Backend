"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const user_constant_1 = require("../users/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const counseling_controller_1 = require("./counseling.controller");
const counseling_validation_1 = require("./counseling.validation");
const router = express_1.default.Router();
router.post("/createEvent", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.counsellor), (0, validateRequest_1.default)(counseling_validation_1.CounselingValidation.CounselingValidationSchema), counseling_controller_1.CounselingControllers.createCounseling);
router.get("/", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.counsellor, user_constant_1.USER_ROLE.student), counseling_controller_1.CounselingControllers.getAllEvent);
router.post("/meetCreate", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.counsellor), counseling_controller_1.CounselingControllers.createMeetLink);
exports.MeetRoutes = router;

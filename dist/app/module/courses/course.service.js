"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const course_model_1 = __importDefault(require("./course.model"));
const courses_constant_1 = require("./courses.constant");
const users_model_1 = __importDefault(require("../users/users.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
//create Course in the Database
const createCourseIntoDB = (courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const course = new course_model_1.default(courseData);
    yield course.save();
    return course.toObject();
});
//get All course
const getAllCourserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    const courseQuery = new QueryBuilder_1.default(course_model_1.default.find().populate("files"), queryObj)
        .search(courses_constant_1.courseSearchableFields)
        .filter()
        .paginate()
        .sort()
        .fields(); //chaining
    const result = yield courseQuery.modelQuery;
    return result;
});
//student add course in the profile
const createCourseInProfileIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, authInformation } = payload;
    // Check if the user exists
    const user = yield users_model_1.default.findOne({ email: authInformation.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Check if the course exists
    const course = yield course_model_1.default.findById(id);
    if (!course) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    }
    // Add the course ID to the user's courses array if it doesn't already exist
    user.courses.addToSet(course._id);
    yield user.save();
    return user;
});
// Get single course find from Database logic
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield course_model_1.default.findOne({ _id: id }).populate("files");
        if (!result) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Course not found");
        }
        return result;
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            throw error;
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to retrieve Course");
        }
    }
});
exports.courseService = {
    createCourseIntoDB,
    getAllCourserFromDB,
    createCourseInProfileIntoDB,
    getSingleCourseFromDB,
};

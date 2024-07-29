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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_utils_1 = require("../users/user.utils");
const users_model_1 = __importDefault(require("../users/users.model"));
//signUp user or create user
const signUpUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastUserId = yield (0, user_utils_1.findLastCreatedUser)();
        let newUserId = 1000;
        if (lastUserId) {
            newUserId = lastUserId + 1;
        }
        payload.id = newUserId;
        const hashedPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
        payload.password = hashedPassword; //password Hashed
        const result = yield users_model_1.default.create(payload);
        const _a = result.toObject(), { password } = _a, userWithoutSensitiveFields = __rest(_a, ["password"]);
        return userWithoutSensitiveFields;
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw AppError_1.default;
    }
});
//login user in site
const loginUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if the user exists
    const user = yield users_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found!");
    }
    if (user.status === "ban") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is Ban contact to support");
    }
    if (user.isDeleted === true) {
        throw new AppError_1.default(http_status_1.default.GONE, "This Account is Deleted");
    }
    // Compare the plain password with the hashed password
    const isMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user.password);
    if (!isMatch) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid password");
    }
    // Creating a JWT token upon successful login
    const jwtPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_key, {
        expiresIn: "30d",
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.refresh_key, {
        expiresIn: "30d",
    });
    return { user, accessToken, refreshToken };
});
// RefreshToken function
const refreshTokenGen = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_key);
    const { email, role } = decoded;
    const jwtPayload = {
        email,
        role,
    };
    const newAccessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_key, {
        expiresIn: "10d",
    });
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthServices = {
    signUpUserIntoDB,
    loginUserFromDB,
    refreshTokenGen,
};

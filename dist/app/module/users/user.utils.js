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
exports.findLastCreatedUser = void 0;
const users_model_1 = __importDefault(require("./users.model"));
const findLastCreatedUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastUser = yield users_model_1.default.findOne({}).sort({ createdAt: -1 }).lean();
        if (lastUser && lastUser.id) {
            return lastUser.id;
        }
        else {
            return null; // Return null or handle appropriately when no user or ID is found
        }
    }
    catch (error) {
        console.error("Error finding last created user:", error);
        throw error; // You may want to handle this error more gracefully in your application
    }
});
exports.findLastCreatedUser = findLastCreatedUser;

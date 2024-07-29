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
exports.CounselingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const counseling_model_1 = __importDefault(require("./counseling.model"));
//createCounselingDataIntoDB
const createCounselingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { authUserInformation, EventInformation } = payload;
    const createBy = authUserInformation.email;
    console.log(createBy);
    console.log(EventInformation);
    const data = {
        createBy: createBy,
        Duration: EventInformation.Duration,
        selectDate: EventInformation.selectDate,
        Type: EventInformation.Type,
        MeetLink: EventInformation.MeetLink
    };
    try {
        const EventSave = new counseling_model_1.default(data);
        yield EventSave.save();
        return EventSave.toObject();
    }
    catch (error) {
        console.error("Error saving event:", error);
        throw AppError_1.default;
    }
});
//get ALl Event From DB and sent it  Controllers
const getCounsellingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield counseling_model_1.default.find();
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to retrieved Counseling");
    }
});
const CreateGoogleMeetLink = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.CounselingServices = {
    createCounselingIntoDB,
    getCounsellingFromDB,
    CreateGoogleMeetLink,
};

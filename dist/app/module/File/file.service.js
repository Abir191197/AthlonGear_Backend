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
exports.fileUploadService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendImageToCloud_1 = require("../../utils/sendImageToCloud");
const file_model_1 = __importDefault(require("./file.model"));
//create File into DATABASE
// const createFileUploadIntoDB = async (payload: {
//   authUserInformation: any;
//   fileInformation: any;
//   typeInformation: any;
// }) => {
//   const { authUserInformation, fileInformation, typeInformation } = payload;
//   console.log("from here", fileInformation.originalname);
//    const fileName = fileInformation.originalname;
//    const path = fileInformation.path;
//   const {secure_url,resource_type,bytes} =await sendImageToCloud(fileName,path);
//   const newFile: Partial<IFile> = {
//     uploadedBy: authUserInformation.name,
//     //courseId: fileInformation.courseId,
//     type: typeInformation.type,
//     fileUrl: secure_url as string,
//     fileSize: Math.round(bytes / 1024),
//     fileType: resource_type,
//   };
//   const file = new FileModel(newFile);
//   await file.save();
//   return file.toObject();
// };
// Create File into DATABASE
const createFileUploadIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { authUserInformation, fileInformation, typeInformation } = payload;
    const fileName = fileInformation.originalname;
    const buffer = fileInformation.buffer;
    const { secure_url, resource_type, bytes } = yield (0, sendImageToCloud_1.sendImageToCloud)(fileName, buffer);
    const newFile = {
        uploadedBy: authUserInformation.name,
        type: typeInformation.type,
        fileUrl: secure_url,
        fileSize: Math.round(bytes / 1024),
        fileType: resource_type,
    };
    const file = new file_model_1.default(newFile);
    yield file.save();
    return file.toObject();
});
//FILE approved or status change in database
const fileStatusChangeIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the file exists in the database
        const file = yield file_model_1.default.findOne({ _id: id });
        if (!file) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "File not found");
        }
        // Check if the file status is already "Approved"
        if (file.status === "Approved") {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "File already approved");
        }
        // Update the file status to "Approved"
        file.status = "Approved";
        yield file.save();
        return file;
    }
    catch (error) {
        throw error;
    }
});
exports.fileUploadService = {
    createFileUploadIntoDB,
    fileStatusChangeIntoDB
};

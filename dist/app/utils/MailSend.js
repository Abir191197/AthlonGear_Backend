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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("../../config"));
const logger = winston_1.default.createLogger({
    level: "debug",
    format: winston_1.default.format.json(),
    transports: [new winston_1.default.transports.Console()],
});
const sendMail = (from, to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: config_1.default.MAIL_HOST,
            auth: {
                user: config_1.default.MAIL_USERNAME,
                pass: config_1.default.MAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: html,
        };
        logger.info(`Sending mail to - ${to}`);
        const info = yield transporter.sendMail(mailOptions);
        logger.info("Email sent: " + info.response);
    }
    catch (error) {
        logger.error(error);
    }
});
exports.sendMail = sendMail;

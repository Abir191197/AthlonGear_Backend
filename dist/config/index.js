"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    cloudinary_cloud_name: process.env.cloudinary_cloud_name,
    cloudinary_api_key: process.env.cloudinary_api_key,
    cloudinary_api_secret: process.env.cloudinary_api_secret,
    bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
    access_key: process.env.access_secret,
    refresh_key: process.env.refresh_secret,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    STORE_ID: process.env.STORE_ID,
    SIGNATURE_KEY: process.env.SIGNATURE_KEY,
    PAYMENT_URL: process.env.PAYMENT_URL,
    PAYMENT_VERIFY_URL: process.env.PAYMENT_VERIFY_URL,
};

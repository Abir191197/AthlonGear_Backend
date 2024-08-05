/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";

import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";


const app = express();

// Parsers
app.use(express.json());
app.use(cookieParser());

// Allow multiple origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://athlon-gear.vercel.app/",
];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server runs from AthlonGear_backend");
});

// Global error handler
app.use(globalErrorHandler);

// Not Found middleware
app.use(notFound);

export default app;

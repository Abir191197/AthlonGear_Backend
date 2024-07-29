import mongoose, { Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin" | "counsellor" | "student";
  status: string;
  isDeleted: boolean;
  imageLink: string;
  program: string;
  coverLink: string;
  courses: Types.ObjectId[];
}

export type TUserRole = keyof typeof USER_ROLE;

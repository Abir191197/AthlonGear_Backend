import mongoose, { Schema } from "mongoose";
import { TUser } from "./users.interface";

const UserSchema = new Schema<TUser>(
  {
    id: {
      type: Number,
      required: true,
      default: 1000,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Courses", default: [] }],
    role: {
      type: String,
      required: true,
      default: "student",
    },
    status: {
      type: String,
      required: true,
      default: "Active",
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    imageLink: {
      type: String,
      required: true,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    coverLink: {
      type: String,
      require: true,
      default:
        "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    program: {
      type: String,
      required: true,
      default:
        "BSCSE",
    },
  },

  { timestamps: true }
);

const UserModel = mongoose.model<TUser>("Users", UserSchema, "Users");

export default UserModel;

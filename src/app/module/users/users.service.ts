import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import UserModel from "./users.model";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "./users.interface";

//find one user into DB

const findUserFromDB = async (payload: JwtPayload | null) => {
  try {
    if (payload !== null) {
      const result = await UserModel.findOne({
        email: payload.email,
      })
        .select("-password")
        .populate("courses");
      return result;
    }
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to Get User");
  }
};


//Updated User Into DB


const updatedUserIntoDB = async (
  payload: JwtPayload | null,
  updateData: Partial<TUser>
) => {
  try {
    if (payload !== null) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email: payload.email },
        { $set: updateData },
        { new: true, runValidators: true }
      ).select("-password"); // Exclude the password field from the result

      if (!updatedUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
      }

      return updatedUser;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid payload");
    }
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update user");
  }
};


//updated  role student to admin into DB




export const UserService = {
  
  findUserFromDB,
  updatedUserIntoDB,
  
};
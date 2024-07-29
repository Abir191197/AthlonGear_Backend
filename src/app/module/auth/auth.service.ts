import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import AppError from "../../errors/AppError";
import { findLastCreatedUser } from "../users/user.utils";
import { TUser } from "../users/users.interface";
import UserModel from "../users/users.model";
import { TLoginUser } from "./auth.interface";

//signUp user or create user

const signUpUserIntoDB = async (payload: TUser) => {
  try {
    const lastUserId = await findLastCreatedUser();
    let newUserId = 1000;
    if (lastUserId) {
      newUserId = lastUserId + 1;
    }
    payload.id = newUserId;

    const hashedPassword = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds)
    );

    payload.password = hashedPassword; //password Hashed

    const result = await UserModel.create(payload);

    const { password, ...userWithoutSensitiveFields } = result.toObject();
    return userWithoutSensitiveFields;
  } catch (error) {
    console.error("Error creating user:", error);
    throw AppError;
  }
};

//login user in site

const loginUserFromDB = async (payload: TLoginUser) => {
  // Checking if the user exists
  const user = await UserModel.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  if (user.status === "ban") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "This user is Ban contact to support"
    );
  }
  if (user.isDeleted === true) {
    throw new AppError(httpStatus.GONE, "This Account is Deleted");
  }

  // Compare the plain password with the hashed password
  const isMatch = await bcrypt.compare(payload?.password, user.password);

  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  // Creating a JWT token upon successful login
  const jwtPayload: JwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.access_key as string, {
    expiresIn: "30d",
  });

  const refreshToken = jwt.sign(jwtPayload, config.refresh_key as string, {
    expiresIn: "30d",
  });

  return { user, accessToken, refreshToken };
};

// RefreshToken function

const refreshTokenGen = async (token: string) => {
  const decoded = jwt.verify(token, config.access_key as string) as JwtPayload;
  const { email, role } = decoded;

  const jwtPayload = {
    email,
    role,
  };

  const newAccessToken = jwt.sign(jwtPayload, config.access_key as string, {
    expiresIn: "10d",
  });

  return {
    accessToken: newAccessToken,
  };
};

export const AuthServices = {
  signUpUserIntoDB,
  loginUserFromDB,
  refreshTokenGen,
};

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TUserRole } from "../module/users/users.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";

const authVerify = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Authorization token is missing or invalid"
      );
    }

    const tokenSplit = token.split("Bearer ")[1];
    try {
      // Verify token
      const decoded = jwt.verify(
        tokenSplit,
        config.access_key as string
      ) as JwtPayload;

      // Assign decoded payload to request object
      req.user = decoded;

      // Role checking
      const role = decoded.role as TUserRole; // Ensure role exists and is of type TUserRole
      if (requiredRoles.length === 0 || requiredRoles.includes(role)) {
        return next();
      }

      // Unauthorized if user's role doesn't match required roles
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You do not have permission to access this resource"
      );
    } catch (error) {
      // Handle token verification errors
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token");
    }
  });
};

export default authVerify;

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import config from "../../../config";

// SignIn function
const Signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.signUpUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is signed up successfully!",
    data: result,
  });
});

//LogIn function 

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserFromDB(req.body);
  const { accessToken, refreshToken } = result;

  

  // res.cookie("accessToken", accessToken, {
  //   secure: config.NODE_ENV === "production",
  //   httpOnly: true,
  //   sameSite: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 365,
  // });

res.cookie("refreshToken", refreshToken, {
  secure: config.NODE_ENV === "production",
  httpOnly: true,
  sameSite: true,
  maxAge: 1000 * 60 * 60 * 24 * 365,
});


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: {
      user: {
        ...result.user.toObject(),
        password: null,
      },
      accessToken: result.accessToken,

      refreshToken: result.refreshToken,
    },
  });


  

});


// RefreshToken function
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshTokenGen(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User access token refreshed successfully!",
    data: result,
  });
});




export const AuthControllers = {
  Signup,
  login,
  refreshToken,
};

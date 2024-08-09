// create Order

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";

const OrderCreate = catchAsync(async (req, res) => {
  const result = await orderService.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Create successfully",
    data: result,
  });
});


//Get ORder single

const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await orderService.getSingleOrderFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Found",
    data: result,
  });
});






export const OrderControllers = {
  OrderCreate,
  getSingleOrder,
};
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productsService } from "./products.service";
import { RequestHandler } from "express";


// create product

const ProductCreate = catchAsync(async (req, res) => {
  const result = await productsService.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product Create successfully",
    data: result,
  });
});


// get all product search ,filter

const getAllProducts: RequestHandler = catchAsync(async (req, res) => {
  const result = await productsService.getAllProductFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product are retrieved  succesfully",
    data: result,
  });
});


//get single product from database

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productsService.getSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product Found",
    data: result,
  });
});


//update or delete product form DB

const updatedProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  // Validate incoming data if necessary
console.log(id);
  const result = await productsService.updatedProductIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});








export const productsControllers = {
  ProductCreate,
  getAllProducts,
  getSingleProduct,
  updatedProduct,
};
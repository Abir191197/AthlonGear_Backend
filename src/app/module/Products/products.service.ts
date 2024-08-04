import httpStatus from "http-status";
import QueryBuilder from "../../builders/QueryBuilder";
import AppError from "../../errors/AppError";
import { ProductSearchableFields } from "./products.constant";
import { TProduct } from "./products.interface";
import ProductsModel from "./products.model";


// create product into DB

const createProductIntoDB = async (
  ProductData: TProduct
): Promise<TProduct> => {
  const product = new ProductsModel(ProductData);
  await product.save();
  return product.toObject();
};

//get all  product from db

const getAllProductFromDB = async (query: Record<string, unknown>) => {

  const queryObj = { ...query };

  const productQuery = new QueryBuilder(ProductsModel.find(), queryObj)
    .search(ProductSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields(); //chaining

  const result = await productQuery.modelQuery;
  return result;









};

//get single product from DB

const getSingleProductFromDB = async (id: string) => {
  try {
    const result = await ProductsModel.findOne({ _id: id });
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "Product not found");
    }
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to retrieve Product");
    }
  }
};

//update or delete form DB

const updatedProductIntoDB = async (
  id: string,
  updateData: Partial<TProduct>




) => {
  console.log(id);
  console.log(updateData);
  try {
    const updatedProduct = await ProductsModel.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    return updatedProduct;
  } catch (error) {
    throw new Error("Error updating product");
  }
};


export const productsService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updatedProductIntoDB,
};

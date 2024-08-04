import mongoose from "mongoose";
import { TOrderDetails } from "./orders.interface";
import OrderDetailsModel from "./orders.model";
import ProductsModel from "../Products/products.model";

// Function to generate a simple unique order ID
const generateOrderId = () =>
  `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const createOrderIntoDB = async (
  orderData: TOrderDetails
): Promise<TOrderDetails> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Extract product IDs from cartItems
    const productIds = orderData.cartItems.map((item) => item.productId);
    const cartItemMap = new Map(
      orderData.cartItems.map((item) => [
        item.productId.toString(),
        item.quantity,
      ])
    );

    // Find products in the database
    const products = await ProductsModel.find({ _id: { $in: productIds } })
      .session(session)
      .exec();

    // Check if all product IDs are valid
    if (products.length !== productIds.length) {
      throw new Error("One or more product IDs are invalid or do not exist.");
    }

    // Verify stock and update quantities
    for (const product of products) {
      const quantityNeeded = cartItemMap.get(product._id.toString());
      if (!quantityNeeded) {
        throw new Error(
          `Quantity information missing for product ID: ${product._id}`
        );
      }
      if (product.stock < quantityNeeded) {
        throw new Error(`Not enough stock for product ID: ${product._id}`);
      }
    }

    // Update stock for each product
    for (const product of products) {
      const quantityNeeded = cartItemMap.get(product._id.toString());
      if (quantityNeeded) {
        await ProductsModel.updateOne(
          { _id: product._id },
          { $inc: { stock: -quantityNeeded } }
        ).session(session);
      }
    }

    // Generate a new unique order ID
    const orderId = generateOrderId();

    // Create new OrderDetails instance with the generated order ID
    const order = new OrderDetailsModel({ ...orderData, orderId });
console.log(order);
    // Save the order to the database
    await order.save({ session });
    await session.commitTransaction();
    session.endSession();

    return order.toObject();
  } catch (error) {
    console.error("Error creating order:", error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const orderService = {
  createOrderIntoDB,
};

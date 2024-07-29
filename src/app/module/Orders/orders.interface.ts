import { ObjectId } from "mongoose";

export interface TOrders {
  productId: ObjectId[];
  status: "Processing" | "On the Way" | "Delivered";
  totalAmount: number;
  OrderBy: ObjectId[];
}

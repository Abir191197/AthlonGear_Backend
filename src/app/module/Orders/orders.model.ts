import mongoose, { Schema } from "mongoose";
import { TOrders } from "./orders.interface";

const OrderSchema = new Schema<TOrders>(
  {
    productId: [
      { type: Schema.Types.ObjectId, ref: "Products", required: true },
    ],
    status: {
      type: String,
      enum: ["Processing", "On the Way", "Delivered"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    OrderBy: [{ type: Schema.Types.ObjectId, ref: "Users", required: true }],
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<TOrders>("Orders", OrderSchema, "Orders");

export default OrderModel;

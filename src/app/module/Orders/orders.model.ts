import mongoose from "mongoose";
const { Schema } = mongoose;



const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Products", required: true }, 
  quantity: { type: Number, required: true },
});

const deliveryMethodSchema = new Schema({
  title: { type: String, required: true },
  turnaround: { type: String, required: true },
});

const contactFormSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  apartment: { type: String },
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  postal: { type: String, required: true },
  phone: { type: String },
});

const orderDetailsSchema = new Schema(
  {
    orderTotal: { type: Number, required: true },
    deliveryMethod: { type: deliveryMethodSchema, required: true }, 
    contactForm: { type: contactFormSchema, required: true }, 
    cartItems: [cartItemSchema], 
    createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, default: Date.now }, 
    status: {
      type: String,
      enum: ["processing", "on the way", "delivered"],
      default: "processing",
    },
  },
  { timestamps: true }
);


const OrderDetails = mongoose.model("OrderDetails", orderDetailsSchema);

module.exports = OrderDetails;

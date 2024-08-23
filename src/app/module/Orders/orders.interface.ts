import { ObjectId } from "mongoose";

interface DeliveryMethod {
  title: string;
  turnaround: string;
}

interface paymentMethods {
  id: string;
  title: string;
}

interface ContactForm {
  email: string;
  firstName: string;
  lastName: string;
  Address: string;
  Apartment?: string;
  City: string;
  Country: string;
  State: string;
  Postal: string;
  Phone?: string;
}

interface CartItem {
  productId: ObjectId;
  title: string;
  quantity: number;
  price: number;
  imageLink: string;
}

export interface TOrderDetails {
  name: any;
  orderId: string;
  orderTotal: number;
  paymentMethods: paymentMethods;
  deliveryMethod: DeliveryMethod;
  contactForm: ContactForm;
  cartItems: CartItem[];
  status: "Order placed" | "Processing" | "Shipped" | "Delivered";
  paymentStatus: "Pending" | "Paid"|"Failed";
}

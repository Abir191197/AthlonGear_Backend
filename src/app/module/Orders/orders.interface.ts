import { ObjectId } from "mongoose";

interface DeliveryMethod {
  title: string;
  turnaround: string;
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
  title: string; // Single reference to a Product by ID
  quantity: number;
}

export interface TOrderDetails {
  orderId: string;
  orderTotal: number;
  deliveryMethod: DeliveryMethod;
  contactForm: ContactForm;
  cartItems: CartItem[];
  status: "processing" | "on the way" | "delivered";
}

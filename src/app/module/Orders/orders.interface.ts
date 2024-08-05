import { ObjectId } from "mongoose";

interface DeliveryMethod {
  title: string;
  turnaround: string;
}

interface ContactForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  state: string;
  postal: string;
  phone?: string;
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

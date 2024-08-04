 interface DeliveryMethod {
  
  title: string;
  turnaround: string;
 
}

 interface ContactForm {
  email: string;
  firstName: string;
  lastName: string;
  Address: string;
  Apartment: string;
  City: string;
  Country: string;
  State: string;
  Postal: string;
  Phone: string;
}

interface CartItem {
  productId: string; // Reference to a Product by ID
  quantity: number;
}

export interface TOrderDetails {
  orderTotal: number;
  deliveryMethod: DeliveryMethod;
  contactForm: ContactForm;
  cartItems: CartItem[];
}
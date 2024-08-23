import axios from "axios"; // Use this line only if running in a Node.js environment
import config from "../../../config";

// Assuming the type for the paymentData
interface TContactForm {
  email: string;
  firstName: string;
  lastName: string;
  Address: string;
  Apartment?: string;
  City: string;
  Country: string;
  State: string;
  Postal: string;
  Phone: number;
}




interface TOrderDetails {
  orderTotal: number;
  contactForm: TContactForm;
}

const url = config.PAYMENT_URL;

const headers = {
  "Content-Type": "application/json",
};

export async function sendPaymentRequest(paymentData: {
  orderId: string;
  orderData: TOrderDetails;
}) {
  // Construct the payload dynamically
  const payload = {
    store_id: config.STORE_ID,
    signature_key: config.SIGNATURE_KEY,
    tran_id: paymentData.orderId,
    success_url: `https://athlon-gear-backend.vercel.app/api/payment/confirmation?orderId=${paymentData.orderId}&status=success`,
    fail_url: `https://athlon-gear-backend.vercel.app/api/payment/confirmation?status=failed`,
    cancel_url: "https://athlon-gear.vercel.app/",
    amount: paymentData.orderData.orderTotal.toFixed(2),
    currency: "BDT", // Assuming BDT as currency, adjust if needed
    desc: "Order Payment",
    cus_name: `${paymentData.orderData.contactForm.firstName} ${paymentData.orderData.contactForm.lastName}`,
    cus_email: paymentData.orderData.contactForm.email,
    cus_add1: paymentData.orderData.contactForm.Address,
    cus_add2: paymentData.orderData.contactForm.Apartment,
    cus_city: paymentData.orderData.contactForm.City,
    cus_state: paymentData.orderData.contactForm.State,
    cus_postcode: paymentData.orderData.contactForm.Postal,
    cus_country: paymentData.orderData.contactForm.Country,
    cus_phone: paymentData.orderData.contactForm.Phone.toString(),
    type: "json",
  };

  try {
    const response = await axios.post(url as string, payload, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}



export async function verifyPayment(tnxId: string) {
  const url = `${config.PAYMENT_VERIFY_URL}`; // URL to verify the payment
  
  try {
    const response = await axios.get(url, {
      params: {
        store_id: config.STORE_ID,
        signature_key: config.SIGNATURE_KEY,
        type: 'json',
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Payment validation failed:', error);
    throw new Error('Payment validation failed!');
  }
}

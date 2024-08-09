import mongoose from "mongoose";
import { TOrderDetails } from "./orders.interface";
import OrderDetailsModel from "./orders.model";
import ProductsModel from "../Products/products.model";
import { sendMail } from "../../utils/MailSend";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

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

    // Save the order to the database
    await order.save({ session });

    // Prepare email content
    const toEmail = order.contactForm?.email;
    console.log(toEmail);
    const from = "m.abiralam197@gmail.com";
    const subject = "Order Confirmation";

    // Construct the HTML content for the email
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        .order-details, .contact-details, .cart-items {
            margin-bottom: 20px;
        }
        .order-details table, .cart-items table {
            width: 100%;
            border-collapse: collapse;
        }
        .order-details th, .cart-items th, .order-details td, .cart-items td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .order-details th, .cart-items th {
            background-color: #f4f4f4;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #000;
            background-color: #54a7ff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Order Confirmation</h1>
        <p>Dear ${order?.contactForm?.firstName},</p>
        <p>Thank you for your order! Below are the details of your order:</p>

        <div class="order-details">
            <h2>Order Details</h2>
            <table>
                <tr>
                    <th>Order ID</th>
                    <td>${order?.orderId}</td>
                </tr>
                <tr>
                    <th>Order Total</th>
                    <td>$${order?.orderTotal}</td>
                </tr>
                <tr>
                    <th>Delivery Method</th>
                    <td>${order?.deliveryMethod?.title} (${order?.deliveryMethod?.turnaround})</td>
                </tr>
            </table>
        </div>

        <div class="contact-details">
            <h2>Contact Information</h2>
            <table>
                <tr>
                    <th>Email</th>
                    <td>${order?.contactForm?.email}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>${order?.contactForm?.firstName} ${order?.contactForm?.lastName}</td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>${order?.contactForm?.Address}, ${order?.contactForm?.Apartment ? order?.contactForm?.Apartment + ", " : ""}${order?.contactForm?.City}, ${order?.contactForm?.State}, ${order?.contactForm?.Postal}, ${order?.contactForm?.Country}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>${order?.contactForm?.Phone || "N/A"}</td>
                </tr>
            </table>
        </div>

        <div class="cart-items">
            <h2>Cart Items</h2>
            <table>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                </tr>
                ${order?.cartItems
                  ?.map(
                    (item) => `
                <tr>
                    <td>${item?.title}</td>
                    <td>${item?.quantity}</td>
                </tr>
                `
                  )
                  .join("")}
            </table>
        </div>

        <a href="https://athlon-gear.vercel.app/Orders/TrackOrder" class="button">Track Your Order</a>

        <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>If you have any questions, please contact our support team.</p>
        </div>
    </div>
</body>
</html>
`;

    // Send email
    await sendMail(from, toEmail, subject, html);
    console.log("Order confirmation email sent");

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



//Get Single ORder from DB

const getSingleOrderFromDB = async (id: string) => {
  try {
    const result = await OrderDetailsModel.findOne({
      orderId: id,
    });
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "Order Not found");
    }
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to retrieve Order");
    }
  }
};






export const orderService = {
  createOrderIntoDB,
  getSingleOrderFromDB,
};

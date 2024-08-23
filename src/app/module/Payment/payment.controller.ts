
import catchAsync from "../../utils/catchAsync";

const confirmationPayment = catchAsync(async (req, res) => {
  res.send("<h1>Payment Successful</h1>");
});

export const PaymentController = {
  confirmationPayment,
};

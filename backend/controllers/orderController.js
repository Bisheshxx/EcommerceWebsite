const Order = require("../models/orderModels");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandles");
const catchAsyncError = require("../middleware/catchAsyncErrors");

//creating new order
module.exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.User.id,
  });
  res.status(200).json({
    success: true,
    message: "Order has been placed!",
    order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found", 400));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get users own order
exports.getMyOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.find({ user: req.User._id });
  if (!order) {
    return next(new ErrorHandler("Order not found", 400));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get all orders -- admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.find();
  let totalAmmount = 0;
  order.forEach((order) => {
    totalAmmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    order,
    totalAmmount,
  });
});

//updating orders
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.find(req.params.id);
  if (order.orderStatus === "delivered") {
    return next(
      new ErrorHandler("Your order has already been delivered!", 400)
    );
  }
  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });
  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);
  product.stock = -quantity;
  product.save({ validateBeforeSave: false });
};

//delete order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found", 400));
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});

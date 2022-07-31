const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandles");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

//Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "this is default", url: "Sample" },
  });
  sendToken(user, 201, res);
});

//login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ErrorHandler("Please enter Email & Password!"));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    next(new ErrorHandler("The User Does not Exist! Please Check email."));
  }
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    next(new ErrorHandler("The User Does not Exist! Please Check email."));
  }
  sendToken(user, 200, res);
});
exports.logOutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({
    success: true,
    message: "Successfully Logged Out!",
  });
});

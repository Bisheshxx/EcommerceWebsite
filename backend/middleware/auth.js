const ErrorHandler = require("../utils/errorhandles");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new ErrorHandler("You must be logged in to access this page!", 401)
    );
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.User = await User.findById(decodeData.id);
  next();
});

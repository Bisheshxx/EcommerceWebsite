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

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.User.role)) {
      return next(
        new ErrorHandler(
          `Role:${req.User.role} is not allowed to access this source`,
          403
        )
      );
    }
    next();
  };
};

const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandles");
const catchAsyncError = require("../middleware/catchAsyncErrors");

//Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "this is default", url: "Sample" },
  });
  res.status(201).json({
    success: true,
    user,
  });
});

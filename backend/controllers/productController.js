const Product = require("../models/productModel");

//Create Product
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
};
//Get All Products-Admin
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

exports.updateProduct = async (req, res, next) => {
  let productId = Product.findById(req.params.id);
  if (!productId) {
    return res.status(500).json({
      success: "failed",
      message: "Product not found",
    });
  }
  productId = await Product.findByIdAndUpdate(req.params.id, req.body, {
    mew: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({
    success: true,
    productId,
  });
};

//Delete Product--Admin
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      succes: false,
      message: "Product not found!",
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Delete Successfull!!",
  });
};

//Get Single Product
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product does not exist!",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

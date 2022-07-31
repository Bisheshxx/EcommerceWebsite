const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");
const { isUserAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(isUserAuthenticated, getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/products/:id").patch(updateProduct).delete(deleteProduct);
router.route("/product/:id").get(getSingleProduct);
module.exports = router;

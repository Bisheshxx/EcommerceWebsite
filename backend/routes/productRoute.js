const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products/new")
  .post(isUserAuthenticated, authorizeRoles("Admin"), createProduct);
router
  .route("/admin/products/:id")
  .patch(isUserAuthenticated, authorizeRoles("Admin"), updateProduct)
  .delete(isUserAuthenticated, authorizeRoles("Admin"), deleteProduct);
router.route("/product/:id").get(getSingleProduct);
module.exports = router;

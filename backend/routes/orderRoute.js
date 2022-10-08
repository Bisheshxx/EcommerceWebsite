const express = require("express");
const {
  createOrder,
  getSingleOrder,
  getMyOrder,
  getAllOrders,
} = require("../controllers/orderController");
const router = express.Router();
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");
router.route("/order/new").post(isUserAuthenticated, createOrder);
router.route("/order/:id").get(isUserAuthenticated, getSingleOrder);
router.route("/orders/myorder").get(isUserAuthenticated, getMyOrder);
router
  .route("/orders/admin")
  .get(isUserAuthenticated, authorizeRoles("admin"), getAllOrders);
module.exports = router;

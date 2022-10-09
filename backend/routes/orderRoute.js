const express = require("express");
const {
  createOrder,
  getSingleOrder,
  getMyOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");
router.route("/order/new").post(isUserAuthenticated, createOrder);
router.route("/order/:id").get(isUserAuthenticated, getSingleOrder);
router.route("/orders/myorder").get(isUserAuthenticated, getMyOrder);
router
  .route("/orders/admin")
  .get(isUserAuthenticated, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/orders/:id")
  .put(isUserAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isUserAuthenticated, authorizeRoles("admin"), deleteOrder); //test these endpoints
module.exports = router;

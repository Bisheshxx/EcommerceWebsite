const express = require("express");
const { createOrder } = require("../controllers/orderController");
const router = express.Router();
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");
router.route("/order/new").post(isUserAuthenticated, createOrder);
module.exports = router;

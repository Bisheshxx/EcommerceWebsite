const express = require("express");
const {
  registerUser,
  loginUser,
  logOutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logOutUser);
router.route("/profile").get(isUserAuthenticated, getUserDetails);
router.route("/password/update").put(isUserAuthenticated, updatePassword);
router
  .route("/profile/updateprofile")
  .patch(isUserAuthenticated, updateUserProfile);
router
  .route("/admin/users")
  .get(isUserAuthenticated, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isUserAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isUserAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isUserAuthenticated, authorizeRoles("admin"), deleteUser);
module.exports = router;

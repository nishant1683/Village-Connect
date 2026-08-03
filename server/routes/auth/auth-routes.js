const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  userLogin,
  userRegister,
  adminLogin,
  verifyToken,
  changePassword,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

// New Separate Endpoints
router.post("/user/login", userLogin);
router.post("/user/register", userRegister);
router.post("/admin/login", adminLogin);
router.get("/verify", verifyToken);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;


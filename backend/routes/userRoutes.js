const express = require("express");
const {
  registerUser,
  loginUser,
  accountRecovery,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUsers,
  updateUser,
  deleteUser,
  changePassword,
  logoutUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();


// Login route
router.post('/login', loginUser);

// Register route
router.post('/register', registerUser);

// Account recovery 
router.post('/account-recovery', accountRecovery);

// Reset Password 
router.post('/reset-password', resetPassword);

// Change Password
router.put("/change-password", protect, changePassword);

// Logout User
router.post('/logout', protect, logoutUser); 


// User profile routes
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
    .delete(protect, deleteUserProfile);

// Admin routes
router.route('/')
    .get(protect, admin, getUsers)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);


module.exports = router;

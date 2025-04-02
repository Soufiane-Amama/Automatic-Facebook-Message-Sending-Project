const express = require("express");
const { getMotivationalMessage, getRecommendationMessage } = require("../controllers/aiNotificationController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// مسارات الإشعارات
// router.get("/notifications", protect, getNotifications);
// router.put("/notifications/:notificationId/read", protect, markNotificationAsRead);

// استرجاع الرسالة التحفيزية الأخيرة
router.get("/motivation", protect, getMotivationalMessage);

// استرجاع رسالة التوصيات الأخيرة
router.get("/recommendation", protect, getRecommendationMessage);

module.exports = router;

const express = require("express");
const { createDailyProgress, getDailyProgressByChallenge, deleteDailyProgress } = require("../controllers/dailyProgressController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// مسارات التقدم اليومي
router.post("/", protect, createDailyProgress);

// جلب توثيقات تحدي معين
router.get("/:challengeId", protect, getDailyProgressByChallenge);

// حذف سجل تقدم يومي
router.delete("/:dailyProgressId", protect, deleteDailyProgress);

module.exports = router;

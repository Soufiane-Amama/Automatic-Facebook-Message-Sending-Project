const express = require("express");
const {
    createAnnouncedChallenge,
    getAnnouncedChallenges,
    // getAnnouncedChallengeById,
    updateAnnouncedChallenge,
    deleteAnnouncedChallenge
} = require("../controllers/announcedChallengeController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// إنشاء تحدي جديد
router.post("/", protect, admin, createAnnouncedChallenge);

// جلب جميع التحديات
router.get("/", protect, getAnnouncedChallenges);

// جلب تحدي واحد عبر ID
// router.get("/:id", getAnnouncedChallengeById);

// تحديث تحدي
router.put("/", protect, admin, updateAnnouncedChallenge);

// حذف تحدي
router.delete("/", protect, admin, deleteAnnouncedChallenge);


module.exports = router;

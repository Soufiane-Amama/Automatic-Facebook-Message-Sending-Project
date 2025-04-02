const express = require("express");
const { calculateWeeklyResults, getBadges, getPunishments, } = require("../controllers/badgePunishmentController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// مسارات الشارات والعقوبات
router.get("/weekly-results", protect, calculateWeeklyResults);

router.get("/badges", protect, getBadges);

router.get("/punishments", protect, getPunishments);


module.exports = router;

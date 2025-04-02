const express = require("express");
const { createChallenge, getUserChallenges, updateChallengeStatus, deleteChallenge } = require("../controllers/challengeController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();


// مسارات التحدي الفردي
router.post("/", protect, createChallenge);
router.get("/", protect, getUserChallenges);
router.put("/", protect, updateChallengeStatus);
router.delete("/", protect, deleteChallenge);


module.exports = router;

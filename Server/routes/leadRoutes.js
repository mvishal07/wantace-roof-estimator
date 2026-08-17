const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getLeads,
  getLeadById,
} = require("../controllers/leadController");

const router = express.Router();

router.get("/", protect, getLeads);

router.get("/:id", protect, getLeadById);

module.exports = router;
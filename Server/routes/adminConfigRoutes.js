const express = require("express");

const {
  getAdminConfig,
  updateAdminConfig,
} = require("../controllers/adminConfigController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", protect, getAdminConfig);


router.put("/", protect, updateAdminConfig);

module.exports = router;
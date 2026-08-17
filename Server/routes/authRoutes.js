const express = require("express");

const {
  loginAdmin,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", loginAdmin);


module.exports = router;
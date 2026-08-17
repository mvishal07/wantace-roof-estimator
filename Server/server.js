require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const configRoutes = require("./routes/configRoutes");
const estimateRoutes = require("./routes/estimateRoutes");
const leadRoutes = require("./routes/leadRoutes");
const adminConfigRoutes = require("./routes/adminConfigRoutes");
const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Wantace API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/config", configRoutes);
app.use("/api/estimate", estimateRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/admin/config", adminConfigRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
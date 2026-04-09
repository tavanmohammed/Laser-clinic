require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { verifyEmailTransport } = require("./config/email");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Booking API is running");
});

app.get("/test-route", (req, res) => {
  res.send("backend latest code is live");
});

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

async function startServer() {
  try {
    await connectDB();
    await verifyEmailTransport();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`CLIENT_URL = ${process.env.CLIENT_URL}`);
      console.log(`  /api/auth`);
      console.log(`  /api/bookings`);
      console.log(`  /api/admin`);
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
}

startServer();

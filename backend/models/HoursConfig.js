const mongoose = require("mongoose");

// Stores the clinic's default weekly hours
// Only one document ever exists (singleton)
const hoursConfigSchema = new mongoose.Schema(
  {
    regular: {
      weekday:  { open: { type: String, default: "10:00" }, close: { type: String, default: "20:00" } },
      saturday: { open: { type: String, default: "10:00" }, close: { type: String, default: "20:00" } },
      sunday:   { open: { type: String, default: "" },      close: { type: String, default: "" } },
    },
    nails: {
      weekday:  { open: { type: String, default: "10:00" }, close: { type: String, default: "20:00" } },
      saturday: { open: { type: String, default: "10:00" }, close: { type: String, default: "20:00" } },
      sunday:   { open: { type: String, default: "" },      close: { type: String, default: "" } },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HoursConfig", hoursConfigSchema);

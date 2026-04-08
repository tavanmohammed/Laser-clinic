const express = require("express");
const router = express.Router();
const { requireAdmin } = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");
const HoursConfig = require("../models/HoursConfig");
const DayRule = require("../models/DayRule");
const { getWorkingSlots } = require("../utils/bookingHelpers");

// ── Auth check ────────────────────────────────────────────────────────────────

router.get("/me", requireAdmin, (req, res) => {
  res.json({ ok: true, role: "admin" });
});

// ── Bookings ──────────────────────────────────────────────────────────────────

// GET /api/admin/bookings?from=YYYY-MM-DD
router.get("/bookings", requireAdmin, async (req, res) => {
  try {
    const { from } = req.query;
    const query = {};
    if (from) query.date = { $gte: from };

    const bookings = await Booking.find(query).sort({ date: 1, time: 1 });

    const normalized = bookings.map((b) => ({
      _id: b._id,
      name: b.customerName || b.name || b.fullName || "",
      phone: b.phone || "",
      email: b.email || "",
      notes: b.notes || "",
      serviceName: b.serviceName || "",
      serviceCategory: b.serviceCategory || b.category || "",
      bookingType: b.bookingType || "regular",
      date: b.date,
      time: b.time,
      endTime: b.endTime || "",
      status: b.status || "confirmed",
      source: b.source || "website",
      price: b.price ?? null,
      createdAt: b.createdAt,
    }));

    res.json(normalized);
  } catch (error) {
    console.error("admin/bookings GET error:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// POST /api/admin/bookings — create a phone booking
router.post("/bookings", requireAdmin, async (req, res) => {
  try {
    const {
      name, phone, email, notes,
      serviceId, serviceName, serviceCategory, bookingType,
      date, time,
    } = req.body;

    if (!name || !phone || !serviceName || !date || !time) {
      return res.status(400).json({ message: "Missing required fields: name, phone, serviceName, date, time" });
    }

    // Respects DB hours + rules
    const workingSlots = await getWorkingSlots(date);
    if (workingSlots.length === 0) {
      return res.status(400).json({ message: "The clinic is closed on this date" });
    }
    if (!workingSlots.includes(time)) {
      return res.status(400).json({ message: "Invalid time slot for selected date" });
    }

    const conflict = await Booking.findOne({
      date,
      time,
      status: { $ne: "cancelled" },
    });
    if (conflict) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }

    const booking = await Booking.create({
      customerName: name,
      phone,
      email: email || "",
      notes: notes || "",
      serviceId: serviceId || "",
      serviceName,
      serviceCategory: serviceCategory || "",
      bookingType: bookingType || "regular",
      category: serviceCategory || "",
      date,
      time,
      source: "phone",
      status: "confirmed",
      price: 0,
    });

    res.status(201).json({
      _id: booking._id,
      name: booking.customerName,
      phone: booking.phone,
      email: booking.email,
      serviceName: booking.serviceName,
      serviceCategory: booking.serviceCategory,
      bookingType: booking.bookingType,
      date: booking.date,
      time: booking.time,
      status: booking.status,
      source: booking.source,
      createdAt: booking.createdAt,
    });
  } catch (error) {
    console.error("admin/bookings POST error:", error.message);
    res.status(500).json({ message: "Failed to create booking" });
  }
});

// PUT /api/admin/bookings/:id
router.put("/bookings/:id", requireAdmin, async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.json(updated);
  } catch (error) {
    console.error("admin/bookings PUT error:", error.message);
    res.status(500).json({ message: "Failed to update booking" });
  }
});

// DELETE /api/admin/bookings/:id
router.delete("/bookings/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("admin/bookings DELETE error:", error.message);
    res.status(500).json({ message: "Failed to delete booking" });
  }
});

// ── Availability (for admin phone booking form) ───────────────────────────────

// GET /api/admin/availability?date=YYYY-MM-DD
router.get("/availability", requireAdmin, async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const workingSlots = await getWorkingSlots(date);

    if (workingSlots.length === 0) {
      return res.json({ slots: [], closed: true });
    }

    const bookings = await Booking.find({
      date,
      status: { $ne: "cancelled" },
    }).select("time");

    const bookedTimes = bookings.map((b) => b.time);
    const slots = workingSlots.filter((s) => !bookedTimes.includes(s));

    res.json({ slots, closed: false });
  } catch (error) {
    console.error("admin/availability error:", error.message);
    res.status(500).json({ message: "Failed to load availability" });
  }
});

// ── Hours ─────────────────────────────────────────────────────────────────────

// GET /api/admin/hours
router.get("/hours", requireAdmin, async (req, res) => {
  try {
    let config = await HoursConfig.findOne();
    if (!config) {
      // Create default on first access
      config = await HoursConfig.create({});
    }
    res.json(config);
  } catch (error) {
    console.error("admin/hours GET error:", error.message);
    res.status(500).json({ message: "Failed to fetch hours" });
  }
});

// PUT /api/admin/hours — saves to DB, affects booking form immediately
router.put("/hours", requireAdmin, async (req, res) => {
  try {
    let config = await HoursConfig.findOne();
    if (!config) {
      config = new HoursConfig(req.body);
    } else {
      config.regular = req.body.regular;
      config.nails = req.body.nails;
    }
    await config.save();
    res.json(config);
  } catch (error) {
    console.error("admin/hours PUT error:", error.message);
    res.status(500).json({ message: "Failed to save hours" });
  }
});

// ── Rules (closed days, hour overrides, time blocks) ─────────────────────────

// GET /api/admin/rules?from=YYYY-MM-DD
router.get("/rules", requireAdmin, async (req, res) => {
  try {
    const { from } = req.query;
    const query = from ? { date: { $gte: from } } : {};
    const rules = await DayRule.find(query).sort({ date: 1 });
    res.json(rules);
  } catch (error) {
    console.error("admin/rules GET error:", error.message);
    res.status(500).json({ message: "Failed to fetch rules" });
  }
});

// POST /api/admin/rules — saves closed day / hour override / block to DB
router.post("/rules", requireAdmin, async (req, res) => {
  try {
    const { date, kind, open, close, blocks } = req.body;
    if (!date || !kind) {
      return res.status(400).json({ message: "date and kind are required" });
    }

    // If a rule of the same kind already exists for this date, replace it
    await DayRule.deleteOne({ date, kind });

    const rule = await DayRule.create({
      date,
      kind,
      open: open || null,
      close: close || null,
      blocks: blocks || [],
    });

    res.status(201).json(rule);
  } catch (error) {
    console.error("admin/rules POST error:", error.message);
    res.status(500).json({ message: "Failed to save rule" });
  }
});

// DELETE /api/admin/rules/:id
router.delete("/rules/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await DayRule.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Rule not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("admin/rules DELETE error:", error.message);
    res.status(500).json({ message: "Failed to delete rule" });
  }
});

module.exports = router;
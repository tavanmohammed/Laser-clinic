const Booking = require("../models/Booking");
const { getWorkingSlots } = require("../utils/bookingHelpers");
const {
  sendBookingConfirmationEmail,
  sendBookingUpdatedEmail,
  sendBookingCancelledEmail,
  sendAdminBookingAlert,
} = require("../services/emailService");

exports.getAvailability = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const workingSlots = await getWorkingSlots(date);

    if (workingSlots.length === 0) {
      return res.json({ availableSlots: [] });
    }

    const bookings = await Booking.find({
      date,
      status: { $ne: "cancelled" },
    })
      .select("time")
      .lean();

    const bookedTimes = bookings.map((b) => b.time);

    const availableSlots = workingSlots.filter(
      (slot) => !bookedTimes.includes(slot)
    );

    res.json({ availableSlots });
  } catch (error) {
    console.error("getAvailability error:", error.message);
    res.status(500).json({ message: "Failed to load availability" });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      notes,
      serviceId,
      serviceName,
      category,
      price,
      date,
      time,
      source,
    } = req.body;

    if (!customerName || !phone || !serviceId || !serviceName || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [workingSlots, existingBooking] = await Promise.all([
      getWorkingSlots(date),
      Booking.findOne({
        date,
        time,
        status: { $ne: "cancelled" },
      }).lean(),
    ]);

    if (!workingSlots.includes(time)) {
      return res.status(400).json({
        message: "Invalid booking time for selected date",
      });
    }

    if (existingBooking) {
      return res.status(400).json({
        message: "This time slot is already booked",
      });
    }

    const booking = await Booking.create({
      customerName,
      phone,
      email,
      notes,
      serviceId,
      serviceName,
      category,
      price,
      date,
      time,
      source: source || "website",
      status: "confirmed",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

    sendBookingConfirmationEmail(booking).catch((err) =>
      console.error("Customer email failed:", err.message)
    );

    sendAdminBookingAlert(booking).catch((err) =>
      console.error("Admin email failed:", err.message)
    );
  } catch (error) {
    console.error("createBooking error:", error.message);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    res.json(bookings);
  } catch (error) {
    console.error("getAllBookings error:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const existingBooking = await Booking.findById(id);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const newDate = updates.date || existingBooking.date;
    const newTime = updates.time || existingBooking.time;
    const newStatus = updates.status || existingBooking.status;

    if (newStatus !== "cancelled") {
      const [workingSlots, conflictingBooking] = await Promise.all([
        getWorkingSlots(newDate),
        Booking.findOne({
          _id: { $ne: id },
          date: newDate,
          time: newTime,
          status: { $ne: "cancelled" },
        }).lean(),
      ]);

      if (!workingSlots.includes(newTime)) {
        return res.status(400).json({
          message: "Invalid booking time for selected date",
        });
      }

      if (conflictingBooking) {
        return res.status(400).json({
          message: "Another booking already exists in this time slot",
        });
      }
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });

    if (updatedBooking.status === "cancelled") {
      sendBookingCancelledEmail(updatedBooking).catch((err) =>
        console.error("Cancel email failed:", err.message)
      );
    } else {
      sendBookingUpdatedEmail(updatedBooking).catch((err) =>
        console.error("Update email failed:", err.message)
      );
    }
  } catch (error) {
    console.error("updateBooking error:", error.message);
    res.status(500).json({ message: "Failed to update booking" });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("deleteBooking error:", error.message);
    res.status(500).json({ message: "Failed to delete booking" });
  }
};
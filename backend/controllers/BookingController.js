exports.getAvailability = async (req, res) => {
  try {
    console.log("HIT getAvailability", req.query);

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

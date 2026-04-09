const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/BookingController");

router.get("/availability", (req, res) => {
  res.json({
    ok: true,
    route: "availability works",
    query: req.query,
  });
});
router.get("/", bookingController.getAllBookings);
router.post("/", bookingController.createBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;

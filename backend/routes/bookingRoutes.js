const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/BookingController");

router.get("/availability", bookingController.getAvailability);
router.get("/", bookingController.getAllBookings);
router.post("/", bookingController.createBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getAvailability } = require("../controllers/publicController");

router.get("/availability", getAvailability);

module.exports = router;


const HoursConfig = require("../models/HoursConfig");
const DayRule = require("../models/DayRule");

function formatTo12Hour(hour, minute = 0) {
  const ampm = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  const m = String(minute).padStart(2, "0");
  return `${h}:${m} ${ampm}`;
}

function generateSlots(startHour, endHour) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(formatTo12Hour(hour, 0));
    slots.push(formatTo12Hour(hour, 15));
    slots.push(formatTo12Hour(hour, 30));
    slots.push(formatTo12Hour(hour, 45));
  }
  return slots;
}

// Parse date in LOCAL time to avoid UTC midnight shifting the day
function getDayNumber(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).getDay();
}

function isSunday(dateString) {
  return getDayNumber(dateString) === 0;
}

// Parse "HH:MM" string into hour number
function parseHour(timeStr) {
  if (!timeStr) return null;
  return parseInt(timeStr.split(":")[0], 10);
}

// Parse "HH:MM" string into total minutes from midnight
function toMinutes(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

// Get default hours for a day from the hoursConfig document
function getDefaultSlotsFromConfig(config, dayNum) {
  // Sunday (0) = closed by default
  if (dayNum === 0) return [];

  // Saturday (6) uses saturday config, Mon-Fri uses weekday
  const key = dayNum === 6 ? "saturday" : "weekday";
  const hours = config?.regular?.[key];

  if (!hours || !hours.open || !hours.close) return [];

  const startHour = parseHour(hours.open);
  const endHour = parseHour(hours.close);

  if (startHour === null || endHour === null) return [];
  return generateSlots(startHour, endHour);
}

// Main function — async, reads hours config + day rules from DB
async function getWorkingSlots(dateString) {
  if (!dateString) return [];

  const dayNum = getDayNumber(dateString);

  // 1. Check for a "closed" rule for this specific date
  const closedRule = await DayRule.findOne({ date: dateString, kind: "closed" });
  if (closedRule) return [];

  // 2. Check for a custom hours override for this date
  const hoursRule = await DayRule.findOne({ date: dateString, kind: "hours" });

  let slots;
  if (hoursRule && hoursRule.open && hoursRule.close) {
    // Use the override hours
    const startHour = parseHour(hoursRule.open);
    const endHour = parseHour(hoursRule.close);
    slots = generateSlots(startHour, endHour);
  } else {
    // Use default hours from DB config
    let config = await HoursConfig.findOne();
    if (!config) {
      // Fallback: Mon-Sat 10-20, Sun closed
      if (dayNum === 0) return [];
      slots = generateSlots(10, 20);
    } else {
      slots = getDefaultSlotsFromConfig(config, dayNum);
    }
  }

  // 3. Apply any time blocks (remove blocked slots)
  const blocksRule = await DayRule.findOne({ date: dateString, kind: "blocks" });
  if (blocksRule && blocksRule.blocks?.length > 0) {
    slots = slots.filter((slot) => {
      // Convert slot back to minutes to check against blocks
      const slotMinutes = slotToMinutes(slot);
      return !blocksRule.blocks.some((block) => {
        const blockStart = toMinutes(block.start);
        const blockEnd = toMinutes(block.end);
        return slotMinutes >= blockStart && slotMinutes < blockEnd;
      });
    });
  }

  return slots;
}

// Convert "10:30 AM" style slot back to minutes for block comparison
function slotToMinutes(slot) {
  const match = slot.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const ampm = match[3].toUpperCase();
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

module.exports = {
  formatTo12Hour,
  generateSlots,
  getDayNumber,
  isSunday,
  getWorkingSlots, // now async — always await it
};
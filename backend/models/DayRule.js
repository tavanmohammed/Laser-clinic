const mongoose = require("mongoose");

// Each document is one rule for one specific date
const dayRuleSchema = new mongoose.Schema(
  {
    date:   { type: String, required: true }, // "YYYY-MM-DD"
    kind:   { type: String, enum: ["closed", "hours", "blocks"], required: true },
    open:   { type: String, default: null },  // for kind="hours"
    close:  { type: String, default: null },  // for kind="hours"
    blocks: [{ start: String, end: String }], // for kind="blocks"
  },
  { timestamps: true }
);

dayRuleSchema.index({ date: 1 });

module.exports = mongoose.model("DayRule", dayRuleSchema);

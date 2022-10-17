const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
  description: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Workout", WorkoutSchema);

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
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Workout", WorkoutSchema);

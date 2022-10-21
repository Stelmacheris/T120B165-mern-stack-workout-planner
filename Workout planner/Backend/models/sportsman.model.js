const mongoose = require("mongoose");

const SportsmanSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  club: {
    type: String,
  },
});

SportsmanSchema.set("timestamps", true);

module.exports = mongoose.model("sportsman", SportsmanSchema);
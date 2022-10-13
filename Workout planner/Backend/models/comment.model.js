const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  workout: { type: mongoose.Schema.Types.ObjectId, ref: "Workout" },
});

CommentSchema.set("timestamps", true);

module.exports = mongoose.model("comments", CommentSchema);

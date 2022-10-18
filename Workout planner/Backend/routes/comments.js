const router = require("express").Router();
let Comment = require("../models/comment.model");
let Workout = require("../models/workout.model");
let User = require("../models/user.model");

//Workout comments
router.route("/:userId/:workoutId").get(async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);
    const user = await User.findById(req.params.userId);
    if (user && workout) {
      const comments = await Comment.find({ workout: req.params.workoutId });
      res.status(200).json({ comments });
    }
  } catch {
    res.status(404).json({ message: "User or workout not found" });
  }
});

router.route("/:userId/:workoutId").post(async (req, res) => {
  if (
    req.body.name.trim().length === 0 ||
    req.body.description.trim().length === 0 ||
    req.body.name === undefined ||
    req.body.description === undefined
  ) {
    res.status(400).json({ message: "All fields should be not empty!" });
  } else {
    try {
      const workout = await Workout.findById(req.params.workoutId);
      const user = await User.findById(req.params.userId);
      const comment = new Comment({
        name: req.body.name,
        description: req.body.description,
        user: req.params.userId,
        workout: req.params.workoutId,
      });
      if (user && workout) {
        await comment.save();
        res
          .status(201)
          .json({ message: "Workout commented", _id: comment._id });
      } else {
        res.status(404).json({ message: "User or workout not found" });
      }
    } catch {
      res.status(404).json({ message: "User or workout not found1" });
    }
  }
});

router.route("/:userId/:workoutId/:commentId").put(async (req, res) => {
  if (
    req.body.name === undefined ||
    req.body.description === undefined ||
    req.body.name.trim().length === 0 ||
    req.body.description.trim().length === 0
  ) {
    res
      .status(400)
      .json({ message: "All credentials should be not empty!", status: 400 });
  } else {
    try {
      const comment = await Comment.findById(req.params.commentId);
      const workout = await Workout.findById(req.params.workoutId);
      const user = await User.findById(req.params.userId);
      if (
        comment.user.toString() === req.params.userId &&
        comment &&
        workout &&
        user
      ) {
        const comment = await Comment.findByIdAndUpdate(
          req.params.commentId,
          req.body,
          {
            new: true,
          }
        );
        res.status(200).json({ message: "comment updated" });
      } else {
        res.status(400).json({ message: "Not your comment" });
      }
    } catch {
      res.status(404).json({ message: "Not found" });
    }
  }
});

router.route("/:userId/:workoutId/:commentId").delete(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    const workout = await Workout.findById(req.params.workoutId);
    const user = await User.findById(req.params.userId);
    if (
      comment.user.toString() === req.params.userId &&
      comment &&
      workout &&
      user
    ) {
      const comment = await Comment.findByIdAndDelete(req.params.commentId);
      res.status(204).json({ message: "comment Deleted" });
    } else {
      res.status(400).json({ message: "Not your comment" });
    }
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});
module.exports = router;

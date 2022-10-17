const router = require("express").Router();
let Workout = require("../models/workout.model");
let User = require("../models/user.model");

router.route("/:userId").post(async (req, res) => {
  // const user = req.params.userId;
  try {
    const { name, link, description } = req.body;
    const user = await User.findById(req.params.userId);
    if (user) {
      if (
        name === undefined ||
        link === undefined ||
        description === undefined ||
        name.trim().length === 0 ||
        link.trim().length === 0 ||
        description.trim().length === 0
      ) {
        res.status(400).json({
          message: "All credentials should be not empty!",
        });
      } else {
        const workout = new Workout({
          name,
          link,
          user: user,
          description,
          isVerified: false,
        });

        await workout.save();
        res.status(201).json({ message: "Workout added!", _id: workout._id });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch {
    res.status(404).json({ message: "User not found 1" });
  }
});

router.route("/:userId").get(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      const workouts = await Workout.find({ user: req.params.userId });
      res.status(200).json({ workouts });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch {
    res.status(404).json({ message: "User not found" });
  }
});

router.route("/:userId/:workoutId").delete(async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);
    const user = await User.findById(req.params.userId);
    if (user) {
      if (workout) {
        await Workout.findByIdAndDelete(req.params.workoutId);
        res.status(204).json({ message: "Deleted succesfully" });
      } else {
        res.status(404).json({ message: "Workout not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch {
    res.status(404).json({ message: "User or workout not found" });
  }
});

router.route("/:userId/:workoutId").put(async (req, res) => {
  try {
    const { name, link, description } = req.body;

    const workout = await Workout.findById(req.params.workoutId);
    const user = await User.findById(req.params.userId);
    if (user) {
      if (workout) {
        if (
          name === undefined ||
          link === undefined ||
          description === undefined ||
          name.trim().length === 0 ||
          link.trim().length === 0 ||
          description.trim().length === 0
        ) {
          res.status(400).json({
            message: "All credentials should be not empty!",
          });
        } else {
          const workout = await Workout.findByIdAndUpdate(
            req.params.workoutId,
            req.body,
            {
              new: true,
            }
          );
          res.status(200).json({ message: "Updated succesfully!" });
        }
      } else {
        res.status(404).json({ message: "Workout not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch {
    res.status(404).json({ message: "User or workout not found" });
  }
});
module.exports = router;

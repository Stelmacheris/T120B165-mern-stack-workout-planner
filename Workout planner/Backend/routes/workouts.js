const router = require("express").Router();
let Workout = require("../models/workout.model");
let User = require("../models/user.model");
const { ObjectId } = require("mongodb");
let Sportsman = require("../models/sportsman.model");

router.route("/").post(async (req, res) => {
  // const user = req.params.userId;
  try {
    const sportsmanId = req.baseUrl.split("/")[2];
    console.log(sportsmanId);
    const { name, link, description } = req.body;
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
        sportsman: sportsmanId,
        description,
        isVerified: false,
      });
      const sportsman = await Sportsman.findById(ObjectId(sportsmanId));

      await workout.save();
      res.status(201).json(workout);
    }
  } catch {
    res.status(404).json({ message: "User not found" });
  }
});
router.route("/").get(async (req, res) => {
  try {
    const sportsmanId = req.baseUrl.split("/")[2];

    const workouts = await Workout.find({ sportsman: sportsmanId });
    const sportsman = await Sportsman.findById(sportsmanId);
    if (workouts && sportsman) {
      res.status(200).json(workouts);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

router.route("/:workoutId").get(async (req, res) => {
  try {
    const sportsmanId = req.baseUrl.split("/")[2];
    const sportsman = await Sportsman.findById(ObjectId(sportsmanId));
    const workouts = await Workout.find({
      _id: req.params.workoutId,
      sportsman: ObjectId(sportsmanId),
    });
    if (workouts[0] && sportsman) {
      res.status(200).json(workouts[0]);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

router.route("/:workoutId").delete(async (req, res) => {
  try {
    const sportsmanId = req.baseUrl.split("/")[2];
    const sportsman = await Sportsman.findById(ObjectId(sportsmanId));
    const workouts = await Workout.find({
      _id: req.params.workoutId,
      sportsman: ObjectId(sportsmanId),
    });
    if (workouts[0] && sportsman) {
      await Workout.findByIdAndDelete(workouts[0]._id);
      res.status(204).json({ message: "Deleted succesfully" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch {
    res.status(404).json({ message: "Workout not found" });
  }
});

router.route("/:workoutId").put(async (req, res) => {
  // console.log(req.params.workoutId)
  try {
    const { name, link, description } = req.body;
    const sportsmanId = req.baseUrl.split("/")[2];
    const sportsman = await Sportsman.findById(ObjectId(sportsmanId));
    console.log(sportsmanId);
    console.log(sportsman);
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
      const workouts = await Workout.find({
        _id: req.params.workoutId,
        sportsman: ObjectId(sportsmanId),
      });
      if (workouts[0] && sportsman) {
        const workout = await Workout.findByIdAndUpdate(
          req.params.workoutId,
          req.body,
          {
            new: true,
          }
        );
        res.status(200).json({ message: "Updated succesfully!" });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    }
  } catch {
    res.status(404).json({ message: "User or workout not found" });
  }
});
module.exports = router;

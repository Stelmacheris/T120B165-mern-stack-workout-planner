const router = require("express").Router();

const { model } = require("mongoose");
let Schedule = require("../models/schedule.model");
let Workout = require("../models/workout.model");
let User = require("../models/user.model");

router.route("/:userId").post(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    console.log(user);
    const scheduleWorkout = new Schedule({
      date: req.body.date,
      user: req.params.userId,
      workout: req.body.workout,
    });
    if (
      req.body.date === undefined ||
      req.body.workout === undefined ||
      req.body.date.trim().length === 0 ||
      req.body.workout.trim().length === 0
    ) {
      res.status(400).json({ message: "All credentials should be not empty!" });
    } else {
      const response = await scheduleWorkout.save();
      if (response) {
        res.status(201).json({
          message: "Workout added to your schedule",
          _id: scheduleWorkout._id,
        });
      } else {
        res.status(400).json({ message: "Error" });
      }
    }
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

router.route("/:userId").get(async (req, res) => {
  try {
    const schedule = await Schedule.find({ user: req.params.userId });
    const user = await User.findById(req.params.userId);
    if (schedule) {
      res.status(200).json({ schedule });
    } else {
      res.status(400).json({ message: "Error", status: 400 });
    }
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

router.route("/:userId/:scheduleId").put(async (req, res) => {
  try {
    if (
      req.body.date === undefined ||
      req.body.workout === undefined ||
      req.body.date.trim().length === 0 ||
      req.body.workout.trim().length === 0
    ) {
      res.status(400).json({ message: "All credentials should be not empty!" });
    } else {
      const user = await User.findById(req.params.userId);
      const schedule = await Schedule.findById(req.params.scheduleId);
      const response = await Schedule.findByIdAndUpdate(
        req.params.scheduleId,
        req.body,
        {
          new: true,
        }
      );
      if (response) {
        res.status(200).json({ message: "Updated succesfully" });
      } else {
        res.status(400).json({ message: "Error" });
      }
    }
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

router.route("/:userId/:scheduleId").delete(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const schedule = await Schedule.findById(req.params.scheduleId);

    if (user && schedule) {
      const response = await Schedule.findByIdAndDelete(req.params.scheduleId);
      res.status(204).json({ message: "Deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});
module.exports = router;

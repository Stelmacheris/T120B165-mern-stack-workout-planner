const router = require("express").Router();

const { model } = require("mongoose");
let Schedule = require("../models/schedule.model");

router.route("/add").post(async (req, res) => {
  const scheduleWorkout = new Schedule({
    date: req.body.date,
    user: req.body.user,
    workout: req.body.workout,
  });
  if (
    req.body.date.trim().length === 0 ||
    req.body.user.trim().length === 0 ||
    req.body.workout.trim().length === 0
  ) {
    res
      .status(400)
      .json({ message: "All credentials should be not empty!", status: 400 });
  } else {
    const response = await scheduleWorkout.save();
    if (response) {
      res
        .status(200)
        .json({ message: "Workout added to your schedule", status: 200 });
    } else {
      res.status(400).json({ message: "Error", status: 400 });
    }
  }
});

router.route("/").get(async (req, res) => {
  const schedule = await Schedule.find({ user: req.body.userId });
  if (schedule) {
    res.status(200).json({ schedule, status: 200 });
  } else {
    res.status(400).json({ message: "Error", status: 400 });
  }
});

router.route("/:scheduleId").put(async (req, res) => {
  const response = await Schedule.findByIdAndUpdate(
    req.params.scheduleId,
    req.body,
    {
      new: true,
    }
  );

  if (response) {
    res.status(200).json({ message: "Updated succesfully", status: 200 });
  } else {
    res.status(400).json({ message: "Error", status: 400 });
  }
});

router.route("/:scheduleId").delete(async (req, res) => {
  const response = await Schedule.findByIdAndDelete(req.params.scheduleId);

  if (response) {
    res.status(200).json({ message: "Deleted succesfully", status: 200 });
  } else {
    res.status(400).json({ message: "Error", status: 400 });
  }
});
module.exports = router;

const router = require("express").Router();
let Measurement = require("../models/measurements.model");
let Workout = require("../models/workout.model");
let User = require("../models/user.model");

router.route("/:userId").get(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const measurements = await Measurement.find({ user: req.params.userId });
    res.status(200).json({ measurements });
  } catch {
    res.status(404).json({ message: "User not found" });
  }
});

router.route("/:userId").post(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (
      req.body.height.trim().length === 0 ||
      req.body.weight.trim().length === 0 ||
      req.body.height === undefined ||
      req.body.weight === undefined
    ) {
      res
        .status(400)
        .json({ message: "All credentials should be not empty!", status: 400 });
    } else {
      const measurement = new Measurement({
        height: req.body.height,
        weight: req.body.weight,
        user: req.params.userId,
      });
      await measurement.save();
      res
        .status(201)
        .json({ message: "New measurement saved!", _id: measurement._id });
    }
  } catch {
    res.status(404).json({ message: "User not found" });
  }
});

router.route("/:userId/:measurementId").put(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const measurement = await User.findById(req.params.measurementId);

    if (
      req.body.height.trim().length === 0 ||
      req.body.weight.trim().length === 0 ||
      req.body.height === undefined ||
      req.body.weight === undefined
    ) {
      res
        .status(400)
        .json({ message: "All credentials should be not empty!", status: 400 });
    } else {
      const measurements = await Measurement.findByIdAndUpdate(
        req.params.measurementId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ message: "Updated succesfully!" });
    }
  } catch {
    res.status(404).json({ message: "User or measurement not found" });
  }
});

router.route("/:userId/:measurementId").delete(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const measurement = await User.findById(req.params.measurementId);
    await Measurement.findByIdAndDelete(req.params.measurementId);
    res.status(204).json({ message: "Deleted succesfully" });
  } catch {
    res.status(404).json({ message: "User or measurement not found" });
  }
});

module.exports = router;

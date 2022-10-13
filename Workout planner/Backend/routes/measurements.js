const router = require("express").Router();
let Measurement = require("../models/measurements.model");

router.route("/").get(async (req, res) => {
  const measurements = await Measurement.find({ user: req.body.userId });
  res.status(200).json({ measurements, status: 200 });
});

router.route("/add").post(async (req, res) => {
  if (
    req.body.height.trim().length === 0 ||
    req.body.weight.trim().length === 0 ||
    req.body.userId.trim().length === 0
  ) {
    res
      .status(400)
      .json({ message: "All credentials should be not empty!", status: 400 });
  } else {
    const measurement = new Measurement({
      height: req.body.height,
      weight: req.body.weight,
      user: req.body.userId,
    });
    await measurement.save();
    res.status(200).json({ message: "New measurement saved!", status: 200 });
  }
});

router.route("/:id").put(async (req, res) => {
  if (
    req.body.height.trim().length === 0 ||
    req.body.weight.trim().length === 0
  ) {
    res
      .status(400)
      .json({ message: "All credentials should be not empty!", status: 400 });
  } else {
    const measurements = await Measurement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Updated succesfully!", status: 200 });
  }
});

router.route("/:id").delete(async (req, res) => {
  const measurement = await Measurement.findByIdAndDelete(req.params.id);
  if (measurement) {
    res.status(200).json({ message: "Deleted succesfully", status: 200 });
  } else {
    res.status(400).json({ message: "Deletion failed", status: 400 });
  }
});

module.exports = router;

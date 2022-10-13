const router = require("express").Router();
let Workout = require("../models/workout.model");

router.route("/add").post(async (req, res) => {
  const { name, link, trainer, description } = req.body;
  const workout = new Workout({ name, link, trainer, description });
  if (
    name.trim().length === 0 ||
    link.trim().length === 0 ||
    description.trim().length === 0
  ) {
    res
      .status(400)
      .json({ message: "All credentials should be not empty!", status: 400 });
  } else {
    await workout.save();
    res.status(200).json({ message: "Workout added!", status: 200 });
  }
});

router.route("/").get(async (req, res) => {
  const workouts = await Workout.find({ trainer: req.body.id });
  res.status(200).json({ workouts, status: 200 });
});

router.route("/:id").delete(async (req, res) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (workout) {
    res.status(200).json({ message: "Deleted succesfully", status: 200 });
  } else {
    res.status(400).json({ message: "Deletion failed", status: 400 });
  }
});

router.route("/:id").put(async (req, res) => {
  if (
    req.body.name.trim().length === 0 ||
    req.body.link.trim().length === 0 ||
    req.body.description.trim().length === 0
  ) {
    res
      .status(400)
      .json({ message: "All credentials should be not empty!", status: 400 });
  } else {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Updated succesfully!", status: 200 });
  }
});

module.exports = router;

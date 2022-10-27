const router = require("express").Router();
let Comment = require("../models/comment.model");
let Workout = require("../models/workout.model");
let User = require("../models/user.model");
let Sportsman = require("../models/sportsman.model");

const { ObjectId } = require("mongodb");
//Workout comments
router.route("/:commentId/").get(async (req, res) => {
  const sportsmanId = req.baseUrl.split("/");
  const sportsman1 = sportsmanId[2];
  const workout1 = sportsmanId[4];
  try {
    const sportsman = await Sportsman.findById(ObjectId(sportsman1));
    const workouts = await Workout.find({
      _id: ObjectId(workout1),
      sportsman: sportsman._id,
    });
    if (workouts[0] && sportsman) {
      const comments = await Comment.find({
        _id: req.params.commentId,
        user: sportsman._id,
        workout: workouts[0]._id,
      });
      if (comments[0]) {
        res.status(200).json(comments[0]);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

router.route("/").get(async (req, res) => {
  const sportsmanId = req.baseUrl.split("/");
  const sportsman1 = sportsmanId[2];
  const workout1 = sportsmanId[4];
  try {
    const sportsman = await Sportsman.findById(ObjectId(sportsman1));
    const workouts = await Workout.find({
      _id: ObjectId(workout1),
      sportsman: sportsman._id,
    });
    if (workouts[0] && sportsman) {
      const comments = await Comment.find({
        user: sportsman._id,
        workout: workouts[0]._id,
      });
      if (comments) {
        res.status(200).json(comments);
      }
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

router.route("/").post(async (req, res) => {
  const sportsmanId = req.baseUrl.split("/");
  const sportsman1 = sportsmanId[2];
  const workout1 = sportsmanId[4];
  try {
    const sportsman = await Sportsman.findById(ObjectId(sportsman1));
    const workouts = await Workout.find({
      _id: ObjectId(workout1),
      sportsman: sportsman._id,
    });
    if (workouts[0] && sportsman) {
      const comment = new Comment({
        name: req.body.name,
        description: req.body.description,
        user: sportsman._id,
        workout: workouts[0]._id,
      });
      await comment.save();
      res.status(201).json(comment);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

router.route("/:commentId").put(async (req, res) => {
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
    const sportsmanId = req.baseUrl.split("/");
    const sportsman1 = sportsmanId[2];
    const workout1 = sportsmanId[4];
    try {
      const sportsman = await Sportsman.findById(ObjectId(sportsman1));
      const workouts = await Workout.find({
        _id: ObjectId(workout1),
        sportsman: sportsman._id,
      });
      if (workouts[0] && sportsman) {
        const comments = await Comment.find({
          _id: req.params.commentId,
          user: sportsman._id,
          workout: workouts[0]._id,
        });
        if (comments.length !== 0) {
          await Comment.findByIdAndUpdate(req.params.commentId, req.body, {
            new: true,
          });
          res.status(201).json({ message: "Updates succesfully" });
        } else {
          res.status(404).json({ message: "Not found" });
        }
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch {
      res.status(404).json({ message: "Not found" });
    }
  }
});

router.route("/:commentId").delete(async (req, res) => {
  const sportsmanId = req.baseUrl.split("/");
  const sportsman1 = sportsmanId[2];
  const workout1 = sportsmanId[4];
  try {
    const sportsman = await Sportsman.findById(ObjectId(sportsman1));
    const workouts = await Workout.find({
      _id: ObjectId(workout1),
      sportsman: sportsman._id,
    });
    if (workouts[0] && sportsman) {
      const comments = await Comment.find({
        _id: req.params.commentId,
        user: sportsman._id,
        workout: workouts[0]._id,
      });
      if (comments.length !== 0) {
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(204).json({ message: "Deleted succesfully" });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});
module.exports = router;

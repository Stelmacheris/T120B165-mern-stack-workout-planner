const router = require("express").Router();
let Comment = require("../models/comment.model");
let Workout = require("../models/workout.model");

//Workout comments
router.route("/:id").get(async (req, res) => {
  const comments = await Comment.find({ workout: req.params.id });
  res.status(200).json({ comments, status: 200 });
});

router.route("/").post(async (req, res) => {
  const comment = new Comment(req.body);
  if (
    req.body.name.trim().length === 0 ||
    req.body.description.trim().length === 0
  ) {
    res
      .status(400)
      .json({ message: "All fields should be not empty!", status: 400 });
  } else {
    await comment.save();
    res.json({ message: "Workout commented" });
  }
});

router.route("/:workoutId/:commentId").put(async (req, res) => {
  if (
    req.body.name.trim().length === 0 ||
    req.body.description.trim().length === 0
  ) {
    res
      .status(400)
      .json({ message: "All credentials should be not empty!", status: 400 });
  } else {
    const comments = Comment.find(
      {
        workout: req.params.workoutId,
      },
      function (err, com) {
        if (err) {
          return res.status(400).json({ message: "Error", status: 400 });
        }
        console.log(com);
        if (com.length > 0) {
          com.forEach((element) => {
            if (element._id.toString() === req.params.commentId) {
              if (element.user.toString() === req.body.userId) {
                element.name = req.body.name;
                element.description = req.body.description;
                element.save(function (err, doc) {
                  if (err)
                    return res
                      .status(400)
                      .json({ message: "Error", status: 400 });
                  return res
                    .status(200)
                    .json({ message: "The item has been updated!" });
                });
              } else {
                return res
                  .status(400)
                  .json({ message: "Not your comment", status: 400 });
              }
            }
          });
        } else {
          return res.status(400).json({ message: "No comments", status: 400 });
        }
      }
    );
  }
});

router.route("/:workoutId/:commentId").delete(async (req, res) => {
  const comments = Comment.find(
    {
      workout: req.params.workoutId,
    },
    function (err, com) {
      if (err) {
        return res.status(400).json({ message: "Error", status: 400 });
      }
      if (com.length > 0) {
        com.forEach((element) => {
          if (element._id.toString() === req.params.commentId) {
            if (element.user.toString() === req.body.userId) {
              element.delete(function (err, doc) {
                if (err)
                  return res
                    .status(400)
                    .json({ message: "Error", status: 400 });
                return res
                  .status(200)
                  .json({ message: "The item has been deleted!", status: 200 });
              });
            } else {
              return res
                .status(400)
                .json({ message: "Not your comment", status: 400 });
            }
          }
        });
      } else {
        return res.status(400).json({ message: "No comments", status: 400 });
      }
    }
  );
});
module.exports = router;

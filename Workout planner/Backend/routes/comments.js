const router = require("express").Router();
let Comment = require("../models/comment.model");
let Workout = require("../models/workout.model");
let User = require("../models/user.model");
let Sportsman = require("../models/sportsman.model")

const {ObjectId} = require('mongodb');
//Workout comments
router.route("/:commentId/").get(async (req, res) => {
  const sportsmanId = req.baseUrl.split("/");
  const sportsman1 = sportsmanId[2];
const workout1 = sportsmanId[4];
console.log(sportsmanId);
  console.log(sportsman1,workout1);

     try {
      const workout = await Workout.findById(workout1);
    const sportsman = await Sportsman.findById(sportsman1);
    const comment = await Comment.find({user:sportsman._id,workout:workout._id,_id:req.params.commentId});

      if(workout&&sportsman && comment.length!== 0){
        res
          .status(201)
          .json(comment[0]);
      }
      else{
      res.status(404).json({ message: "Not found" });
      }
      

      
        
    // } catch {
    //   res.status(404).json({ message: "User or workout not found1" });
    // }
    }catch{
        res.status(404).json({message:"Not found"})
      }
});

router.route("/").get(async (req, res) => {
  const sportsmanId = req.baseUrl.split("/");
  const sportsman1 = sportsmanId[2];
const workout1 = sportsmanId[4];
console.log(sportsmanId);
  console.log(sportsman1,workout1);

     try {
      const workout = await Workout.findById(workout1);
    const sportsman = await Sportsman.findById(sportsman1);
    const comments = await Comment.find({user:sportsman._id,workout:workout._id});
      if(workout&&sportsman){
        res
          .status(201)
          .json(comments);
      }
      else{
      res.status(404).json({ message: "Not found" });
      }
        
    // } catch {
    //   res.status(404).json({ message: "User or workout not found1" });
    // }
    }catch{
        res.status(404).json({message:"Not found"})
      }
});


router.route("/").post(async (req, res) => {
  const sportsmanId = req.baseUrl.split("/");
  const sportsman1 = sportsmanId[2];
const workout1 = sportsmanId[4];
console.log(sportsmanId);
  console.log(sportsman1,workout1);
  if (
    req.body.name.trim().length === 0 ||
    req.body.description.trim().length === 0 ||
    req.body.name === undefined ||
    req.body.description === undefined
  ) {
    res.status(400).json({ message: "All fields should be not empty!" });
  } else {
    // try {
      const workout = await Workout.findById(workout1);
    const sportsman = await Sportsman.findById(sportsman1);

      const comment = new Comment({
        name: req.body.name,
        description: req.body.description,
        user: sportsman._id,
        workout: workout._id,
      });
      if(workout&&sportsman){
        await comment.save();
        res
          .status(201)
          .json({ message: "Workout commented", _id: comment._id });
      }
      else{
      res.status(404).json({ message: "Not found" });

      }
        
    // } catch {
    //   res.status(404).json({ message: "User or workout not found1" });
    // }
    }
});

router.route("/:commentId").put(async (req, res) => {
  const sportsmanId = req.baseUrl.split("/");
  const sportsman1 = sportsmanId[2];
const workout1 = sportsmanId[4];
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
      // const comment = await Comment.find({workout:req.params.workoutId,_id:req.params.commentId});
      // const workout = await Workout.findById(req.params.workoutId);
      const workout = await Workout.findById(workout1);
      const sportsman = await Sportsman.findById(sportsman1);
      if(workout && sportsman){
        const comments = await Comment.findByIdAndUpdate(
          req.params.commentId,
          req.body,
          {
            new: true,
          }
        );
      }
      else{
        res.status(404).json({ message: "Not found" });
      }
        res.status(200).json({message:"Updated"})
    } catch {
      res.status(404).json({ message: "Not found" });
    }
  }
});

router.route("/:commentId").delete(async (req, res) => {
  try {
    const sportsmanId = req.baseUrl.split("/");
    const sportsman1 = sportsmanId[2];
  const workout1 = sportsmanId[4];
  const workout = await Workout.findById(workout1);
  const sportsman = await Sportsman.findById(sportsman1);

  if( workout && sportsman)
  {
    const comment1 = await Comment.findByIdAndDelete(req.params.commentId);
      res.status(204).json({ message: "comment Deleted" });
  }
  else{
    res.status(404).json({ message: "Not found" });

  }

    // const comment = await Comment.find({workout:req.params.workoutId,_id:req.params.commentId});
    // const workout = await Workout.findById(req.params.workoutId);
      

  } catch {
    res.status(404).json({ message: "Not found" });
  }
});
module.exports = router;

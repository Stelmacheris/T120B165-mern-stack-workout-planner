const router = require("express").Router();
let Workout = require("../models/workout.model");
let User = require("../models/user.model");
const {ObjectId} = require('mongodb');
let Sportsman = require("../models/sportsman.model")

router.route("/").post(async (req, res) => {
  // const user = req.params.userId;
  try {
    const sportsmanId = req.baseUrl.split('/')[2];
    console.log(sportsmanId)
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
        if(sportsman !== null){
          await workout.save();
        res.status(201).json({ message: "Workout added!", _id: workout._id });
        }
        else{
    res.status(404).json({ message: "Not found" });       

        }
        
      }
    }
   catch {
    res.status(404).json({ message: "User not found" });
  }
});
router.route("/").get(async(req,res) =>{
  const sportsmanId = req.baseUrl.split('/')[2];00

  // const workouts = await Workout.find({sportsman:ObjectId(sportsmanId)});
  // res.json( workouts );
})

router.route("/:workoutId").get(async (req, res) => {
  try {
  const sportsmanId = req.baseUrl.split('/')[2];
  const sportsman = await Sportsman.findById(ObjectId(sportsmanId));
      const workouts = await Workout.find({_id:req.params.workoutId,sportsman:ObjectId(sportsmanId)});
      
      if(sportsman && workouts.length !== 0){
        res.status(200).json( workouts[0] );
      }
      else{
    res.status(404).json({ message: "Not found" });       
      }
      
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

router.route("/").get(async (req, res) => {
  try {
  const sportsmanId = req.baseUrl.split('/')[2];
      const workouts = await Workout.find({_id:req.params.workoutId,sportsman:ObjectId(sportsmanId)});
      const sportsman = await Sportsman.findById({sportsman:sportsmanId});
      if(sportsman){
        res.status(200).json( workouts );
      }
      else{
    res.status(404).json({ message: "Not found" });       
      }
      
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});


router.route("/:workoutId").delete(async (req, res) => {
   try {
    const sportsmanId = req.baseUrl.split('/')[2];
    const sportsman = await Sportsman.findById(ObjectId(sportsmanId));
    const workouts = await Workout.find({_id:req.params.workoutId,sportsman:ObjectId(sportsmanId)});
    console.log(sportsman)
    if(sportsman){
 await Sportsman.findByIdAndDelete(ObjectId(sportsman));
        res.status(204).json({ message: "Deleted succesfully" });
    }
    else{
  res.status(404).json({ message: "Not found" });
      
    }

       
    } 
   catch {
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
    console.log(sportsman)
    if(sportsman){
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
    }
    else{
  res.status(404).json({ message: "Not found" });
      
    }
        

}
   catch {
    res.status(404).json({ message: "User or workout not found" });
  }
});
module.exports = router;

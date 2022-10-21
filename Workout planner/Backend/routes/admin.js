const router = require("express").Router();
let Workout = require("../models/workout.model");
let User = require("../models/user.model");
let Sportsman = require("../models/sportsman.model")
router.route("/").post(async (req,res) =>{
    try {
        const { name, club } = req.body;
          if (
            name === undefined ||
            club === undefined ||
            name.trim().length === 0 ||
            club.trim().length === 0 
          ) {
            res.status(400).json({
              message: "All credentials should be not empty!",
            });
          } else {
            const sportsman = new Sportsman({
              name,
              club
            });
    
            await sportsman.save();
            res.status(201).json({ message: "Workout added!", _id: sportsman._id });
          }
        }
       catch {
        res.status(404).json({ message: "Not found" });
      }
})


router.route("/:sportsmanId").get(async (req, res) => {
    try {
        const sportsmans = await Sportsman.findById(req.params.sportsmanId);
        if(sportsmans.length !== 0){
            res.status(200).json( sportsmans );
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
        const sportsmans = await Sportsman.find({});
        res.status(200).json( sportsmans );
    } catch {
      res.status(404).json({ message: "Not found" });
    }
  });
  
  router.route("/:sportsmanId").delete(async (req, res) => {
    try {
      const sportsman = await Workout.findById(req.params.sportsmanId);

          await Sportsman.findByIdAndDelete(req.params.sportsmanId);
          res.status(204).json({ message: "Deleted succesfully" });
      } 
     catch {
      res.status(404).json({ message: "Not found" });
    }
  });
  
  router.route("/:sportsmanId").put(async (req, res) => {
    try {
      const { name, club } = req.body;
  
      const sportsman = await Sportsman.findById(req.params.sportsmanId);
          if (
            name === undefined ||
            club === undefined ||
            name.trim().length === 0 ||
            club.trim().length === 0 
          ) {
            res.status(400).json({
              message: "All credentials should be not empty!",
            });
          } else {
            const sportsman = await Sportsman.findByIdAndUpdate(
              req.params.sportsmanId,
              req.body,
              {
                new: true,
              }
            );
            res.status(200).json({ message: "Updated succesfully!" });
          }
  
  }
     catch {
      res.status(404).json({ message: "User or workout not found" });
    }
  });

// router.route('/:workoutId').get(async(req,res) =>{
//     try{
//         const workouts = await Workout.findById(req.params.workoutId);
//         res.status(200).json({ workouts});
//     }
//     catch{
//         res.status(404).json({message:"Not found"});
//     }
// })

// router.route('/:workoutId').put(async(req,res) =>{
//     try{
//     const w = await Workout.findById(req.params.workoutId);
//     const workout = await Workout.findByIdAndUpdate(
//         req.params.workoutId,
//         req.body,
//         {
//           new: true,
//         }
//       );
//         res.status(200).json({message:"Updated succesfully"});
    
//     }
//     catch{
//         res.status(404).json({message:"Not found"});
//     }




// })

module.exports = router;
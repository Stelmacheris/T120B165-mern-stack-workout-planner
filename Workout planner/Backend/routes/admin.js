const router = require("express").Router();
let Workout = require("../models/workout.model");
let User = require("../models/user.model");

router.route('/:userId').get(async(req,res) =>{
    try{
    const user = await User.findById(req.params.userId);
    if(user.userType === "admin"){
        const workouts = await Workout.find({isVerified:false});
        res.status(200).json({ workouts});
    }
    else{
        res.status(400).json({message:"Not admin"});
    }
    
    }
    catch{
        res.status(404).json({message:"Not found"});
    }
})

router.route('/:userId/:workoutId').put(async(req,res) =>{


    try{
    const user = await User.findById(req.params.userId);
    const workout = await Workout.findById(req.params.workoutId);

    if(user.userType === "admin"){
        const workouts = await Workout.findOneAndUpdate(req.params.workoutId,{isVerified:true},{new:true})
        res.status(200).json({message:"Updated succesfully"});
    }
    else{
        res.status(404).json({message:"Not admin"});
    }
    
    }
    catch{
        res.status(404).json({message:"Not found"});
    }




})

module.exports = router;
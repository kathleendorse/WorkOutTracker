const router = require("express").Router();
const Workout = require("../models/workout");

//Add field for total duration and send to index.html to display most recent
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: { $sum: "$exercises.duration"}
        }
    }]).then(dbWorkouts=> {
        res.json(dbWorkouts);
    }).catch(err => {
        res.status(400).json(err);
    });
});

//Create new workout
router.post("/api/workouts", ({body}, res)=>{
    Workout.create(body).then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err =>{
        res.status(400).json(err);
    })
});

//Add exercises to a workout
router.put("/api/workouts/:id", (req, res)=>{
    let id= req.params.id;
    Workout.findOneAndUpdate(
        {
        _id: id
        }, 
        { $push: 
            {exercises: req.body}
        }, 
        { new: false }
        ).then(updated =>{
        res.json(updated);
     }).catch(err => {
         res.status(400).json(err);
     });
 });

//Sends data to stat.html
router.get("/api/workouts/range", (req, res)=>{
    Workout.find({})
        .then(dbRange => {
            res.json(dbRange);
        })
        .catch(err => {
            res.status(400).json(err);
            console.log("Could not find range");
        });
});
    
module.exports = router;

  
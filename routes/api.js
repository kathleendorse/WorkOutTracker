const router = require("express").Router();
const Workout = require("../models/workout");

//works but not sure if its right??
// (PUBLIC>API.JS)  getLastWorkout() GET/FETCH "/api/workouts"
router.get("/api/workouts", (req, res) => {

    //this works to find all. workout.js displays last entry
    // Workout.find({})
    //this works to filter down to the last entry
    Workout.find({}).sort({_id: -1}).limit(1)
        .then(dbWorkouts => {
            console.log("FIND SORT LIMIT: ", dbWorkouts);
            console.log("EXERCISES: ",dbWorkouts[0].exercises);
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });

    //--------ATTEMPTED TO APPLY AGGREGATE IN PLACE OF FIND------------------------------------

    // Workout.aggregate({
    //     $addFields: {
    //         totalDuration: { $sum: "$exercises.duration"}
    //     }
    // }).then(dbWorkouts=> {
    //     res.json(dbWorkouts);
    // }).catch(err => {
    //     res.status(400).json(err);
    // });

    //RESPONSE: `Model.aggregate()`. Instead of `Model.aggregate({ $match }, { $skip })`, do `Model.aggregate([{ $match }, { $skip }])`


    //-------ATTEMPTED TO FIND, LIMIT AND THEN APPLY AGGREGATE WITH MATCH---------    
    //  Workout.find({}).sort({_id: -1}).limit(1)
    //  .then(dbWorkouts => {

    //     Workout.aggregate([{ 
    //         $match: {_id: dbWorkouts[0]._id} },
    //         { $addFields: {totalDuration: {$sum: exercises.duration}
    //         }
    //     }]).then(newData=>{
    //         console.log("NEW DATA: ", newData);
    //         res.json(newData);
    //     });

    // })
    // .catch(err => {
    //     res.status(400).json(err);
    // });
    


});


// FIND SORT LIMIT:  [
//     {
//       exercises: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
//       _id: 5f99ddc1b6a1382810f5be46,
//       day: 2020-10-26T21:08:17.926Z
//     }
//   ]

// EXERCISES:  [{"type":"resistance","name":"Military Press","duration":20,"weight":300,"reps":10,"sets":4},{"type":"resistance","name":"test","weight":1,"sets":1,"reps":1,"duration":1},{"type":"resistance","name":"","weight":0,"sets":0,"reps":0,"duration":0},{"type":"cardio","name":"test2","distance":5,"duration":10},{"type":"cardio","name":"","distance":0,"duration":0},{"type":"cardio","name":"test3","distance":5,"duration":10}]



// (PUBLIC>API.JS)  createWorkout POST GET/FETCH "/api/workouts"
router.post("/api/workouts", ({body}, res)=>{
    Workout.create(body).then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err =>{
        res.status(400).json(err);
    })
});


// WORKS FOR ADDING EXERCISE TO NEW WORKOUT
// // (PUBLIC>API.JS) PUT addExercise "/api/workouts/:id"
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








// WORKS FOR THE STATS PAGE
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
  


















  
module.exports = router;
  
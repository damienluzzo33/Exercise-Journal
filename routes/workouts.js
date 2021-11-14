const router = require("express").Router();
const Workouts = require("../models/workouts");

router.get("/api/workouts", async (req, res) => {
    try {
        const dbWorkouts = await Workouts.find({}).sort({ day: 1 });
        if (!dbWorkouts) {
            res.status(400).json({message: "You have no workouts!"})
        }
        res.json(dbWorkouts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/api/workouts", async (req, res) => {
    try {
        const newWorkout = new Workouts(req.body);
        const dbWorkouts = await Workouts.create(newWorkout);
        if (!dbWorkouts) {
            res.status(404).json({ message: "Can't do it!"});
        }
        res.status(200).json(dbWorkouts);
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// {
//     type: 'resistance',
//     name: 'Bicep Curl',
//     duration: 20,
//     weight: 100,
//     reps: 10,
//     sets: 4,
// }

router.put("/api/workouts/:id", async (req, res) => {
    try {
        await Workouts.updateOne(
            { _id: req.params.id },
            { $push: { "exercises": req.body } }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// const res = await Users.aggregate([
//     { $group: { _id: null, maxBalance: { $max: '$balance' }}},
//     { $project: { _id: 0, maxBalance: 1 }}
//   ]);

// { $sum: <expression> }

// db.scores.aggregate( [
//     {
//       $addFields: {
//         totalHomework: { $sum: "$homework" } ,
//         totalQuiz: { $sum: "$quiz" }
//       }
//     },

router.get("/api/workouts/range", async (req, res) => {
    try {
        const workoutRange = await Workouts.find({}).sort({ day: -1 }).limit(7);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})





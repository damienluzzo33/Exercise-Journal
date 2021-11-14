const router = require("express").Router();
const Workouts = require("../models/workouts");

router.get("/api/workouts", async (req, res) => {
    try {
        const dbWorkouts = await Workouts.find({}).aggregate( [
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }
        ] ).sort({ day: 1 });
        console.log(dbWorkouts)
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

router.get("/api/workouts/range", async (req, res) => {
    try {
        const workoutRange = await Workouts.find({}).aggregate( [
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }
        ] ).sort({ day: -1 }).limit(7);
        console.log(workoutRange);
        if (workoutRange) {
            res.status(200).json(workoutRange)
        } else {
            res.status(404).json({message: "No Workouts!"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router;
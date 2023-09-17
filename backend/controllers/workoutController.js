//create routes to router file (and group in workouts.js)
const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");


//routes: testing at Postman
//GET all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  //all -> {}
  //createdAt:-1 -> lastest on top
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//GET a single workout
const getWorkout = async (req, res) => {
  // destructuring, equivalent to const id = req.params.id
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

//POST a new workout
const createWorkout = async (req, res) => {
  //const title = req.body.title, const load = req.body.load
  const { title, load, reps } = req.body;
  //add a new document to the workouts collection (Workout)
  let emptyFields = [];

  if (!title) {
    emptyFields.push("Title");
  }
  if (!load) {
    emptyFields.push("Load");
  }
  if (!reps) {
    emptyFields.push("Reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in the required fields", emptyFields });
  }

  try {
    // comes from middleware: request.user._id
    const user_id = req.user._id
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  //parameters: id
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};
//UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};

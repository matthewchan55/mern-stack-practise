const express = require('express')
const { createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout } = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()
// user needs to be authenticated to use these following functions
router.use(requireAuth)

//GET all workouts
router.get('/', getWorkouts)

//GET single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)

//gather all routes to create a router -> export to server.js
module.exports = router
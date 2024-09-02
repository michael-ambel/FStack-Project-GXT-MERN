const express = require('express')
const {getWorkouts, getWorkout, postWorkout, editWorkout, deleteWorkout} = require('../controllers/workoutController')
const requireAut = require('../middleware/requireAut')

const route = express.Router()

route.use(requireAut)

//Get all workout
route.get('/', getWorkouts)

//Get single workout
route.get('/:id', getWorkout)

//Post single workout
route.post('/', postWorkout)

//Edit single workout
route.patch('/:id', editWorkout)

//Delete single workout
route.delete('/:id', deleteWorkout)

module.exports = route;
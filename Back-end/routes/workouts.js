const express = require('express')
const Workout = require('../models/workoutModel')

const route = express.Router()

//Get all workout
route.get('/', (req, res) => {
    res.json({mssg: 'GET all workout'})
})

//Get single workout
route.get('/:id', (req, res) => {
    res.json({mssg: 'GET single workout'})
})

//Post single workout
route.post('/', async (req, res) => {
    try{
        const { tittle, rep, load } = req.body;
        const workout = await Workout.create({tittle, rep, load})
        res.status(200).json(workout)
    }
    catch{(error) => {
        res.status(400).json({error: error.message})
    }}
})

//Edit single workout
route.patch('/:id', (req, res) => {
    res.json({mssg: 'Edit single workout'})
})

//Delete single workout
route.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE single workout'})
})

module.exports = route;
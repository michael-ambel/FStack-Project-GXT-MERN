const express = require('express')

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
route.post('/', (req, res) => {
    res.json({mssg: 'Post single workout'})
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
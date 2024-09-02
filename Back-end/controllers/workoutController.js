const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

module.exports.getWorkouts = async (req, res) => {
    try{
        const user_id = req.user._id
        const workouts = await Workout.find({user_id}).sort({ _id: -1 });
        res.status(200).json(workouts)
    }
    catch(error){
        res.status(404).json({error: error.message})
    }
}

module.exports.getWorkout = async (req, res) => {
    const { id }= req.params;

    if(mongoose.isValidObjectId(id)){
        try{
            const workout = await Workout.findById(id)
            if(!workout)
            {
                res.status(404).json({error: "There is no such workout"})
            }
            res.status(200).json(workout)
        }
        catch(error){
            res.status(404).json({error: error.message})
        }
    }else{
        res.json({mssg: "Invalid Workout Id"})
    }
}

module.exports.postWorkout = async (req, res) => {
    const { title, rep, load } = req.body;
    const emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!rep){
        emptyFields.push('rep')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill all the fields', emptyFields})
    }

    try{
        const user_id = req.user._id
        const workout = await Workout.create({title, rep, load, user_id})
        res.status(200).json(workout)
        console.log(workout);
    }
    catch(error){
        res.status(400).json({error: error.message})
        console.log(error.message);
    }
}

module.exports.editWorkout = async (req, res) => {
    const { id } = req.params;
    
    if(mongoose.isValidObjectId(id)){
        try{
            const workout = await Workout.findByIdAndUpdate({_id: id}, req.body)
            console.log(req.body);
            res.status(200).json(workout)
        }
        catch(error){
            res.status(404).json({error: error.message})
        }
    }else{
        res.json({mssg: "Invalid Workout Id"})
    }
}

module.exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(mongoose.isValidObjectId(id)){
        try{
            const workout = await Workout.findByIdAndDelete({_id: id})
            res.status(200).json(workout)
        }
        catch{(error) => {
            res.status(404).json({error: error.message})
        }}
    }else{
        res.json({mssg: "Invalid Workout Id"})
    }
}
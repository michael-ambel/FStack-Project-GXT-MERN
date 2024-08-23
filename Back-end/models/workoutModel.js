const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    tittle: {
        type: String,
        require: true
    },
    rep: {
        type: Number,
        require: true
    },
    load: {
        type: Number,
        require: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)
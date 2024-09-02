const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose');
// const cors = require('cors')

const workoutRouter = require('./routes/workoutRoute')
const userRouter = require('./routes/userRoute')

//create react app
const app = express();
mongoose.connect(process.env.URI)
    .then(()=>{
        //start request listner
        app.listen(process.env.PORT, () => {
        console.log('...DB connected');
        console.log('...listning on port:', process.env.PORT);
        })
    })
    .catch((error)=>{
        console.log('Error to connect:', error);
    })



//middleware
app.use(express.json())
// app.use(cors({origin: 'http://localhost:3000'}))
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


//rout handler
app.use('/workout', workoutRouter)
app.use('/', userRouter)


const express = require('express')
require('dotenv').config();

//create react app
const app = express();

//listner
app.listen(process.env.PORT, () => {
    console.log('...start listning on port:', process.env.PORT);
})


//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


//rout handler
app.get('/', (req, res) => {
    res.json({mssg: 'welcome to the app'})
})
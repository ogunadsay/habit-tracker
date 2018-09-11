const express = require('express')
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const cors = require('cors')

const port = 6200
mongoose.connect('mongodb://mongodb').then(()=>{
    console.log('backend started')
}).catch(err=>{
    console.log(err)
    process.exit(1)
})

const habitRoutes = require('./src/routes/habitsRoutes')
const habitHistoryRoutes = require('./src/routes/habitsHistoryRoutes')
const authController = require('./src/routes/authController')
const verifyToken = require('./src/routes/verifyToken')


const app = express()
app.use(express.static('public'))
app.use(cors())
app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json())

// const bool = true;
// app.use(function (req, res, next) {
//     if (bool) {
//         console.log("not authenticated")
//         res.status(401).send("Not authenticated")
//     }else{
//         console.log("autheneticated")
//         next(); 
//     }   
// });
app.use('/',authController)

app.use(verifyToken)
app.use('/',habitRoutes)
app.use('/',habitHistoryRoutes)

app.listen(port,()=>{
    console.log('app running on: ',port)
})


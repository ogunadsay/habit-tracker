const mongoose = require('mongoose')
const Schema = mongoose.Schema

var HabitModel = new Schema({
    title:String,
    description:String,
    userId:String
},{collection:"Habits"})

module.exports = mongoose.model('HabitModel',HabitModel)
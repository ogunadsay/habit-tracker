const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HabitHistoryModel = new Schema({
    habitId:String,
    recordedAt:Date,
    actionType:String
},{collection:'HabitHistories'})

module.exports = mongoose.model('HabitHistoryModel',HabitHistoryModel)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserModel = new Schema({
    username:String,
    password:String,
    email:String
},{collection:'Users'})

module.exports= mongoose.model('UserModel',UserModel)


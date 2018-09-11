const express = require('express')
const app = express()
const router = express.Router()

const HabitModel = require('../models/habitModel')
const HabitHistoryModel = require('../models/habitHistoryModel')

router.route('/habitHistories/').get(function(req,res){
    HabitHistoryModel.find(function (err, items) {
        if (err) console.log(err)
        res.json(items)
    })
})


module.exports = router
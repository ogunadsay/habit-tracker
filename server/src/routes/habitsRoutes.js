const express = require('express')
const app = express()
const router = express.Router()

const HabitModel = require('../models/habitModel')
const HabitHistoryModel = require('../models/habitHistoryModel')

// Get specific
router.route('/habits/:id').get(function (req, res) {
    var id = req.params.id;
    var userId = req.body.id;
    HabitModel.find({ _id: id, userId: userId }, function (err, item) {
        if (err) res.status(500).send('There was a problem with the server')
        res.status(200).send(item)
    })
})

// Get all
router.route('/habits').post(function (req, res) {
    var userId = req.body.userId;
    HabitModel.find({ userId: userId }, function (err, items) {
        if (err) res.status(500).send('There was a problem with the server')
        res.status(200).send(items);
    })
})

// Add
router.route('/habits/add').post(function (req, res) {
    const habit = new HabitModel(req.body);
    habit.save()
        .then(item => {
            const habitHistory = new HabitHistoryModel({
                habitId: item._id,
                recordedAt: Date.now(),
                actionType: 'Add'
            })
            habitHistory.save().then(habitHistory => {
                res.status(200).send({message:"Habit added",id:item._id})
            }).catch(err => {
                console.log(err)
                res.status(400).send('Unable to add to database')
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Unable to add to database')
        })



})

// Update
router.route('/habits/update/:id').post(function (req, res) {
    HabitModel.findById(req.params.id, function (err, habit) {
        if (!habit) {
            return next(new Error('Cannot find habit'))
        }
        else {
            const habitHistory = new HabitHistoryModel({
                habitId: req.params.id,
                recordedAt: Date.now(),
                actionType: 'Update'
            })
            habitHistory.save().then(() => {
                habit.title = req.body.title
                habit.description = req.body.description

                habit.save().then(habit => {
                    res.json('Updated')
                }).catch(err => {
                    res.status(400).send("Cannot update database")
                    console.log(err)
                })
            }).catch(err => {

                console.log(err)
                res.status(400).send('Unable to add to database')
            })

        }
    })
})

// Delete
router.route('/habits/delete/:id').post(function (req, res) {
    HabitModel.findById(req.params.id, function (err, habit) {
        if (err) {
            res.status(500).send('There was a problem with the server')
        }
        if (!habit) {
            res.status(404).send('No habit found!')
        }
        else {
            const habitHistory = new HabitHistoryModel({
                habitId: req.params.id,
                recordedAt: Date.now(),
                actionType: 'Delete'
            })
            habitHistory.save().then(() => {
                habit.remove().then(() => {
                    res.status(200).send('Habit removed.')
                }).catch(err => {
                    res.status(500).send('There was problem with server', err)
                })
            }).catch(err => {
                res.status(500).send('There was problem with server', err)
            })
        }

    })
})

module.exports = router
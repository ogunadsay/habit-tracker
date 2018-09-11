var express = require("express")
var router = express.Router()
var bodyParser = require('body-parser')

const User = require("../models/userModel")

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')

router.route('/user/register').post(function (req, res) {
    if(req.body.username===""||req.body.password===""||req.body.email===""){
        return res.status(400).send("Please fill all fields.")
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 8)

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    }, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem registering user")
        }

        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        })

        res.status(200).send({ auth: true, token: token ,userId:user._id});
    })
})

// router.route('/user/me').get(function (req, res) {
//     User.findById(req.userId,{password:0},function(err,user){
//         if(err) return res.status(500).send('There was a server problem finding user')
//         if(!user) return res.status(404).send('No user found')

//         res.status(200).send(user)
//     })
// })

router.route('/user/login').post(function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('There was a problem finding user')
        if (!user) return res.status(404).send('No user found')

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })

        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        })

        res.status(200).send({ auth: true, token: token ,userId:user._id})
    })
})

module.exports = router;


const mongoose = require('mongoose')
const users = new mongoose.Schema({
    user_name: String,
    password: Number,
    fname: String,
    lname: String,
    age: Number,
    gender: String
})

module.exports = mongoose.model('users',users)

const mongoose = require('mongoose')

const User = new mongoose.Schema({
    firstName: {type: String, default:''},
    lastName: {type: String, default:''},
    email: {type: String, default:''},
    password: {type: String, default:''},
    birthday_day: {type: Number, default: 0},
    birthday_month: {type: Number, default: 0},
    birthday_year: {type: Number, default: 0},
    timestamp: {type: Date, default: Date.now},
})

module.exports = mongoose.model('User', User);
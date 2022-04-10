const { Int32 } = require('mongodb');
const mongoose = require('mongoose')

const User = new mongoose.Schema({
    firstName: {type: String, default:''},
    lastName: {type: String, default:''},
    email: {type: String, default:''},
    password: {type: String, default:''},
    birthday_day: {type: Int32, default:''},
    birthday_month: {type: Int32, default:''},
    birthday_year: {type: Int32, default:''},
    timestamp: {type: Date, default: Date.now},
})

module.exports = mongoose.model('User', User);
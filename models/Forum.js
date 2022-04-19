
const mongoose = require('mongoose')

const Forum = new mongoose.Schema({
    Title: {type: String, default:''},
    Description: {type: String, default:''},
    timestamp: {type: Date, default: Date.now},
    firstName: {type: String, default:''},
    lastName: {type: String, default:''},
})

module.exports = mongoose.model('Forum', Forum);
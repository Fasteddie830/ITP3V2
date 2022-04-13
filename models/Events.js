
const mongoose = require('mongoose')

const Event = new mongoose.Schema({
    Title: {type: String, default:''},
    Description: {type: String, default:''},
    timestamp: {type: Date, default: Date.now},
    img:
    {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Event', Event);
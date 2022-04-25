
const mongoose = require('mongoose')

const Event = new mongoose.Schema({
    Title: {type: String, default:''},
    Description: {type: String, default:''},
    day_day: {type: Number, default: 0},
    day_month: {type: Number, default: 0},
    day_year: {type: Number, default: 0},
    timestamp: {type: Date, default: Date.now},
    img:
    {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Event', Event);
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('User');

router.get('/', (req, res, err) => {
    res.render('error', { message: "not yet implemented" })
})


module.exports = router;
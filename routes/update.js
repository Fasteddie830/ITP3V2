const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('User');

router.get('/', (req, res) => {
    res.render('Update', null);
});


module.exports = router;
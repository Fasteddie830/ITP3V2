const express = require('express');
const User = require('../models/User')
const router = express.Router();
const passport = require('passport')

router.post('/', (req, res, next) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;
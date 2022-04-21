const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const { db } = require('../models/User');
require('../models/User');
const User = mongoose.model('User');

router.get('/', (req, res, next) => {
    const user = req.user
    if (user == null) {
        res.redirect('/')
        return
    }

    const data = {
        user: user

    }

    res.render('account', data)
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})

router.post('/update', (req, res) => {
    updateRecord(req, res);
    res.redirect('/update');

});

// function updateRecord(req, res) {
//    db.users.updateOne({_id:req.user.id});{
       
//    }

// }

module.exports = router;
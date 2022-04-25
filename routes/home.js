const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/', (req, res, next) => {
    const user = req.user
    if(user == null){
        res.redirect('/')
        return
    }

    const data = {
        user : user
    }
    res.render('home', data);
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})


/* router.get('/chat', (err) => {
    return next(new Error('not yet implemented'))
}) */



module.exports = router;
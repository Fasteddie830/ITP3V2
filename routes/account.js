const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res, next) => {
    const user = req.user
    if(user == null){
        res.redirect('/')
        return
    }

    const data = {
        user : user
    }

    res.render('account', data)

    //this is the user's old account page
    /* res.json({
        user: req.user || 'not logged in' //if reference is null, so if user is null, render not logged in instead
    }) */
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})


module.exports = router;
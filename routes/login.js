const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport')


/*
The login flow is the following: The server js files renders in the home.hjs page, which then redirects
the flow to this file, to the passport authenticate part just below here, passes it to the authenticate
strategy, which executes the strategy. 

*/


router.get('/', (req, res, next) => {
    res.render('login', null);
})

router.post('/', passport.authenticate('localLogin', {
    successRedirect: '/home', //if user login is successful, redirect login request
}))




module.exports = router;
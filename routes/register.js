const express = require('express');
const User = require('../models/User')
const router = express.Router();
const passport = require('passport')

router.post('/', passport.authenticate('localRegister', {
    successRedirect: '/home'
}))
/* router.post('/', (req, res, next) => {
    User.create(req.body, (err, user) =>{
        if (err){
            res.json({
                confirmation: 'Fail',
                error: err
            })
            return
        }
    
        res.json({
            confirmation: 'Success',
            user: user
        })

    })
})
 */

module.exports = router;
const LocalStrategy = require('passport-local').Strategy
const bcryptjs = require('bcryptjs')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = (passport) => {

    //tell passport how to store the user while logged in.
    passport.serializeUser((user, next) => {
        next(null, user)
    })

    //find currently logged in user by ID from the mongo database. 
    passport.deserializeUser((id, next) => {
        User.findById(id, (err, user) => { //Take extra fucking care, findById != findByID, also User is capital U
            next(err, user)
        })
    })

    const localLogin = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        //this is returning the callback function
    }, (req, email, password, next) => {
        //inside here is the passport login strategy
        User.findOne({ email: email }, (err, user) => {     //return either an error or found users
            if (err) {
                //if this code cannot resolve the error, then it will pass it onto the next error handler
                //which is currently in server.js
                return next(err)
            }

            if (user == null) {
                //pass a new error to the error handler
                return next(new Error('User not found'))
            }

            
            // check password

            if(bcrypt.compareSync(password, user.password) == false)
                return next(new Error('incorrect password'))

            //this is the old way of checking passwords
            /* if (user.password != req.body.password) {
                return (next(new Error('Incorrect password')))
            } */

            return next(null, user)
        })
    })

    passport.use('localLogin', localLogin)

    const localRegister = new LocalStrategy({   
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, next) => {
        User.findOne({ email: email}, (err, user) => {     //return either an error or found users
            if (err) {
                return next(err)
            }

            if (user != null){
                return next(new Error('User already exists, please log in.'))
            }
            
            var firstNameField = req.body.firstName
            var lastNameField = req.body.lastName
            var birthDateField = req.body.birthday_day
            var birthMonthField = req.body.birthday_month
            var birthYearField = req.body.birthday_year

        

            //create new user if user is not in database
            const hashedPw = bcryptjs.hashSync(password, 10) //this encrypts user password using the Bcrypt library, and the 10 indicates 10 saltrounds, 10 rounds of encoding. 
            User.create({email:email, password: hashedPw, firstName: firstNameField, lastName: lastNameField, birthday_day: birthDateField, birthday_month: birthMonthField, birthday_year: birthYearField }, (err, user) => {
                if(err)
                    return next(err)
                
                next(null, user)
            })
        })
    });

    passport.use('localRegister', localRegister);
}
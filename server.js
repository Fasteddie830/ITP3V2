const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const auth = require('./config/auth')(passport) //the configuration needs 'passport' argument to be passed onto
const landingpage = require('./routes/landingpage');
const register = require('./routes/register');
const login = require('./routes/login');
const account = require('./routes/account');
const logout = require('./routes/logout');
const home = require('./routes/home');
const signUp = require('./routes/signUp');
const events = require('./routes/events');
const forum = require('./routes/forum');


//mongoose connects to our database using the database address and a callback for confirmation
mongoose.connect('mongodb://localhost/sample-store', (err, data) => {
    if(err){
        console.log('DB Connection Failed')
        return
    }

    console.log('DB Connection Success')
})

const app = express();
app.use(session({
    //the session secret will keep everyone's session intact, changing this makes it so that every 
    //logged in user must re-login, in case a compromise of the server has happened. 
    secret: 'sareq3erasd',
    resave: true,
    saveUninitialized: true
}))

//set up passport
app.use(passport.initialize())
app.use(passport.session())

//set up views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', home);
app.use('/register', register)
app.use('/login', login)
app.use('/account', account)
app.use('/logout', logout)
app.use('/home', home)
app.use('/', landingpage)
app.use('/signUp', signUp)
app.use('/events', events)
app.use('/forum', forum)


app.use((err, req, res, next) => {
    //Take the errors and pass it onto the error template
    res.render('error', {message: err})
})

app.listen(5000);
console.log('App running on localhost 5000');
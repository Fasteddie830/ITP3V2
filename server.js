const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv/config');
const multer = require('multer');

//const hjs = require('hjs');
//const ejs = require('ejs');

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
const test1 = require('./routes/test1');
const update = require('./routes/update');
const chat = require('./routes/chat');


//mongoose connects to our database using the database address and a callback for confirmation
/* mongoose.connect('mongodb://localhost/sample-store', (err, data) => {
    if(err){
        console.log('DB Connection Failed')
        return
    }
    
    console.log('DB Connection Success')
})
 */

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    });

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

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
app.set('view engine', 'ejs');
app.set('view engine', 'hjs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', home);

//set up image rendering
//this will go in routes later
/* app.get('/test1.ejs', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('test1', { items: items });
        }
    });
});

//uploading images
//this will go in routes later
app.get('/test1', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('test1.ejs', { items: items });
        }
    });
});

app.post('/test1', upload.single('image'), (req, res, next) => {
  
    var obj = {
        Title: req.body.Title,
        Description: req.body.Description,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/test1');
        }
    });
});
 */
app.use('/register', register)
app.use('/login', login)
app.use('/account', account)
app.use('/logout', logout)
app.use('/home', home)
app.use('/', landingpage)
app.use('/signUp', signUp)
app.use('/events', events)
app.use('/forum', forum)
app.use('/test1', test1)
app.use('/Update', update)
app.use('/chat', chat)



app.use((err, req, res, next) => {
    //Take the errors and pass it onto the error template
    res.render('error', { message: err })
})

app.listen(5000);
console.log('App running on localhost 5000');
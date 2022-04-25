const express = require('express');
const router = express.Router();
var fs = require('fs');
var path = require('path');
require('dotenv/config');
const imgModel = require('../models/Events')

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });


router.get('/', (req, res, next) => {
    const user = req.user
    if(user == null){
        res.redirect('/')
        return
    }

    const data = {
        user : user
    }
     imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('events.ejs', { items: items });
        }
    }); 

    //res.render('events.ejs', { items: items });
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})

/* router.get('/chat', (err) => {
    return next(new Error('not yet implemented'))
}) */



router.post('/', upload.single('image'), (req, res, next) => {
  
    var obj = {
        Title: req.body.Title,
        Description: req.body.Description,
        day_day: req.body.day_day,
        day_month: req.body.day_month,
        day_year: req.body.day_year,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/events');
        }
    });
});

module.exports = router;
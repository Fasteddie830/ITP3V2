const express = require('express');
const router = express.Router();
var fs = require('fs');
var path = require('path');
require('dotenv/config');
const forumModel = require('../models/Forum')

var multer = require('multer');
const { timeStamp, time } = require('console');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'forumUploads')
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

    forumModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('forum.ejs', { items: items });
        }
    }); 
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})


router.post('/', upload.single('image'), (req, res, next) => {
  
    const user = req.user
    if(user == null){
        res.redirect('/')
        return
    }

    var obj = {
        Title: req.body.Title,
        Description: req.body.Description,
        firstName: user.firstName,
        lastName: user.lastName,
    }
    forumModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/forum');
        }
    });
});


module.exports = router;
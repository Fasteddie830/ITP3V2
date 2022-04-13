/* const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    const user = req.user
    const event = req.Events
    if(user == null){
        res.redirect('/')
        return
    }

    const data = {
        event : Events
    }
    res.render('test1', data);
})
router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})

module.exports = router; */

var fs = require('fs');
var path = require('path');
require('dotenv/config');

const express = require('express');
const router = express.Router();
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

router.get('/', (req, res) => {
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

router.post('/', upload.single('image'), (req, res, next) => {
  
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

module.exports = router;
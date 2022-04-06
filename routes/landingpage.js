const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('landingpage', null);
})


module.exports = router;
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('events', null);
})


module.exports = router;
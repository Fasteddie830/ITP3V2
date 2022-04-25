const express = require('express');
const router = express.Router();

router.get('/', (req, res, err) => {
    res.render('error', { message: "not yet implemented" })
})

//res.render('chat', { message: "not yet implemented" })
module.exports = router;
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const token = req.auth.userID;
    res.send({token});
});

module.exports = router;

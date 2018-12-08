var express = require('express');
var router = express.Router();

/* Auth Controller */
var authController = require('../controllers/authentication');

/* GET home page. */
router.get('/google', function(req, res, next) {
    res.send('heloo word');
});

router.post('/google', authController.verifyGoogleToken);
module.exports = router;

var express = require('express');
var router = express.Router();

/* Auth Controller */
var authController = require('../controllers/authentication');

router.post('/google', authController.signInWithGoogle);

module.exports = router;

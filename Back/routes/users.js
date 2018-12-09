const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

function getTodos(jwtString)
{
    const token = jwt.decode(jwtString);
    if( Date.now() < token.nbf*1000) {
        throw new Error('Token not yet valid');
    }
    if( Date.now() > token.exp*1000) {
        throw new Error('Token has expired');
    }
    if( token.iss != 'todoapi') {
        throw new Error('Token not issued here');
    }

    const userID = token.uid;

    return 'It works';
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    const token = req.user.userID;
    res.send({token});
});

module.exports = router;

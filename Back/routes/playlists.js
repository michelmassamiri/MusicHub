const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const playLists = 'playlists';
   res.send({playLists});
});

module.exports = router;
const express = require('express');
const router = express.Router();
const playListController = require('../controllers/playlistController');

router.get('', playListController.getAllPlaylists);
router.post('', playListController.createPlaylist);
module.exports = router;
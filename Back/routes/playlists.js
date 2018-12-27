const express = require('express');
const router = express.Router();
const playListController = require('../controllers/playlistController');

router.get('', playListController.getAllPlaylists);
router.post('', playListController.createPlaylist);
router.delete('/:id', playListController.deletePlaylist);

router.post('/import/youtube', playListController.importFromYoutube);
router.post('/thumbnails/upload', playListController.uploadThumbnail);
module.exports = router;
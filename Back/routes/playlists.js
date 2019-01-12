const express = require('express');
const router = express.Router();
const playListController = require('../controllers/playlistController');

router.get('', playListController.getAllPlaylists);
router.post('', playListController.createPlaylist);
router.get('/:id', playListController.getPlaylist);
router.delete('/:id', playListController.deletePlaylist);
router.put('/:id', playListController.updatePlaylist);

router.post('/import/youtube', playListController.importFromYoutube);
router.post('/thumbnails/upload', playListController.uploadThumbnail);
module.exports = router;
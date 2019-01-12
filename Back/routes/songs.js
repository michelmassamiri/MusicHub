const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.get('', songController.getAllSongs);
router.get('/:id', songController.getSong);
router.post('', songController.createSong);
router.delete('/:id', songController.deleteSong);
router.put('/:id', songController.updateSong);

router.post('/import/youtube', songController.importFromYoutube);
module.exports = router;
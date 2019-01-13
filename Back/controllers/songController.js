Song = require('../models/songsModel');
playlistController = require('../controllers/playlistController');

/* CRUD methods */
exports.getAllSongs = function (req, res, next) {
    const playlistId = req.query.playlistId;
    if (!playlistId){
        return res.status(400).send(
            "Playlist's ID is required in the request parameters, playlistId parameter was not found"
        );
    }

    Song.getSongsPlaylist(playlistId)
        .then((savedSong)=> {
            res.json(savedSong);
        })
        .catch((err)=> next(err));
};

exports.getSong = function (req, res, next) {
    const userId = req.user.userID;
    const playlistId = req.query.playlistId;
    const songId = req.params.id;

    if(!playlistController.userHasPermession(playlistId, userId, next)) {
        return res.status(403).send(
            "Unauthorized Access, authenticated user has no such playlist"
        );
    }

    Song.getSong(songId)
        .then((song)=> {
            res.json(song);
        })
        .catch((err)=> next(err));
};

exports.createSong = function (req, res, next) {
    const userId = req.user.userID;
    const playlistId = req.query.playlistId;
    const song = req.body;

    if(!playlistController.userHasPermession(playlistId, userId, next)) {
        return res.status(403).send(
            "Unauthorized Access, authenticated user has no such playlist"
        );
    }

    Song.insertSong(song)
        .then((newSong)=> res.json(newSong))
        .catch((err)=> next(err));
};

exports.deleteSong = function (req, res, next) {
    const userId = req.user.userID;
    const playlistId = req.query.playlistId;
    const songId = req.params.id;

    if(!playlistController.userHasPermession(playlistId, userId, next)) {
        return res.status(403).send(
            "Unauthorized Access, authenticated user has no such playlist"
        );
    }

    Song.deleteSong(songId)
        .then((deletedSong)=> res.json(deletedSong))
        .catch((err)=> next(err));
};

exports.updateSong = function (req, res, next) {
    const userId = req.user.userID;
    const playlistId = req.query.playlistId;
    const songId = req.params.id;
    const args = req.body;

    if(!playlistController.userHasPermession(playlistId, userId, next)) {
        return res.status(403).send(
            "Unauthorized Access, authenticated user has no such playlist"
        );
    }

    if(args.id || args._id  || args.link || args.playlist_id) {
        return res.status(422).send(
            "Only name, artist or/and genre can be updated"
        );
    }

    Song.updateSong(songId, args)
        .then((updatedSong)=> res.json(updatedSong))
        .catch((err)=> next(err));
};

/* Imports */
exports.importFromYoutube = function (req, res, next) {
    const playlistId = req.query.playlistId;
    const songs = req.body;
    if (!playlistId){
        return res.status(400).send(
            "Playlist's ID is required in the request parameters, playlistId parameter was not found"
        );
    }
    if(!songs || !Array.isArray(songs)){
        return res.status(400).send(
            "Request's body is undefined or request's body is not an array, request's body must be an array"
        );
    }

    buildFromYoutube(songs, playlistId)
        .then((importedSongs)=> {
            res.json(importedSongs);
        })
        .catch((err)=> next(err));
};

/* Static functions */
async function buildFromYoutube (songs, playlistId) {
    let apiSongs = [];
    for(const song of songs) {
        let item = {};
        item.name = song.snippet.title;
        item.link = 'https://www.youtube.com/watch?v=' + song.contentDetails.videoId + '&list=' +
            song.snippet.playlistId;
        item.playlist_id = playlistId;
        apiSongs.push(item);
    }

    return await Song.insertOrUpdateFromYoutube(apiSongs, playlistId);
}
Song = require('../models/songsModel');

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

};

exports.createSong = function (req, res, next) {

};

exports.deleteSong = function (req, res, next) {

};

exports.updateSong = function (req, res, next) {

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
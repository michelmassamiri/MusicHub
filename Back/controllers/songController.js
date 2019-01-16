Song = require('../models/songsModel');
Playlist = require('../models/playlistsModel');
playlistController = require('../controllers/playlistController');

/* CRUD methods */
exports.getAllSongs = function (req, res, next) {
    const playlistId = req.query.playlistId;
    const userId = req.user.userID;
    if(playlistId && (!playlistController.userHasPermession(playlistId, userId, next))) {
        return res.status(403).send({
            error: {status: 403, message: "Unauthorized Access, authenticated user has no such playlist"}
        });
    }

    if (!playlistId){
        const playlistsIds = [];
        Playlist.getUserPlaylists(userId)
            .then((playlists)=> {
                if(!playlists)
                    return res.status(404).send({error: {status: 404, message: "Playlist was Not found"}});

                for(item of playlists) {
                    playlistsIds.push(item.id);
                }
                Song.getSongsByUser(playlistsIds)
                    .then((songs)=> res.json(songs))
                    .catch((err)=> next(err));
            })
            .catch((err)=> next(err));
    }
    else {
        Song.getSongsPlaylist(playlistId)
            .then((savedSong)=> {
                res.json(savedSong);
            })
            .catch((err)=> next(err));
    }
};

exports.getSong = function (req, res, next) {
    const userId = req.user.userID;
    const songId = req.params.id;

    Song.getSong(songId)
        .then((song)=> {
            if(!song) {
                return res.status(404).send({error: {status: 404, message: "Not found"}});
            }
            if(!playlistController.userHasPermession(song.playlist_id, userId, next)) {
                return res.status(403).send({
                    error: {status: 403, message: "Unauthorized Access, authenticated user has no such playlist"}
                });
            }

            return res.json(song);
        })
        .catch((err)=>  {
            console.error(err);
            next({status: 500, message:err})
        });
};

exports.createSong = function (req, res, next) {
    const userId = req.user.userID;
    const song = req.body;

    if(!playlistController.userHasPermession(song.playlist_id, userId, next)) {
        return res.status(403).send({
            error: {status: 403, message: "Unauthorized Access, authenticated user has no such playlist"}
        });
    }

    Song.insertSong(song)
        .then((newSong)=> res.json(newSong))
        .catch((err)=> next(err));
};

exports.deleteSong = function (req, res, next) {
    const userId = req.user.userID;
    const songId = req.params.id;

    Song.getSong(songId)
        .then((song)=> {
            if(!song) {
                return res.status(404).send({error: {status: 404, message: "Not found"}});
            }
            if(!playlistController.userHasPermession(song.playlist_id, userId, next)) {
                return res.status(403).send({
                    error: {status: 403, message: "Unauthorized Access, authenticated user has no such playlist"}
                });
            }

            Song.deleteSong(songId)
                .then((deletedSong)=> res.json(deletedSong))
                .catch((err)=> next(err));
        })
        .catch((err)=>  {
            console.error(err);
            next({status: 500, message:err})
        });
};

exports.updateSong = function (req, res, next) {
    const userId = req.user.userID;
    const songId = req.params.id;
    const args = req.body;

    Song.getSong(songId)
        .then((song)=> {
            if(!song) {
                return res.status(404).send({error: {status: 404, message: "Not found"}});
            }
            if(!playlistController.userHasPermession(song.playlist_id, userId, next)) {
                return res.status(403).send({
                    error: {status: 403, message: "Unauthorized Access, authenticated user has no such playlist"}
                });
            }
            if(args.id || args._id  || args.link || args.playlist_id) {
                return res.status(422).send({
                    error: {status: 422, message: "Only name, artist or/and genre can be updated"}
                });
            }

            Song.updateSong(songId, args)
                .then((updatedSong)=> res.json(updatedSong))
                .catch((err)=> next(err));
        })
        .catch((err)=>  {
            console.error(err);
            next({status: 500, message:err})
        });
};

/* Imports */
exports.importFromYoutube = function (req, res, next) {
    const playlistId = req.query.playlistId;
    const songs = req.body;
    if (!playlistId){
        return res.status(400).send({
            error: {
                status: 400,
                message: "Playlist's ID is required in the request parameters, playlistId parameter was not found"
            }
        });
    }
    if(!songs || !Array.isArray(songs)){
        return res.status(400).send({
            error: {
                status: 400,
                message:
                    "Request's body is undefined or request's body is not an array, request's body must be an array"
            }
        });
    }

    buildFromYoutube(songs, playlistId)
        .then((importedSongs)=> {
            res.json(importedSongs);
        })
        .catch((err)=> next(err));
};

exports.importFromAPI = function (req, res, next) {
    const playlistId = req.query.playlistId;
    const songs = req.body;
    if (!playlistId){
        return res.status(400).send({
            error: {
                status: 400,
                message: "Playlist's ID is required in the request parameters, playlistId parameter was not found"
            }
        });
    }
    if(!songs || !Array.isArray(songs)){
        return res.status(400).send({
            error: {
                status: 400,
                message:
                    "Request's body is undefined or request's body is not an array, request's body must be an array"
            }
        });
    }

    for(let item of songs) {
        item.playlist_id = playlistId;
    }
    Song.insertMany(songs)
        .then((docs)=> res.json(docs))
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
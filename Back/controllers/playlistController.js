Playlist = require('../models/playlistsModel');

exports.getAllPlaylists = function (req, res, next) {
    res.json([]);
};

exports.createPlaylist = function (req, res, next) {
    const userId = req.user.userID;
    const playlists = req.body;
    if(Array.isArray(playlists)) {
        res.json(importPlaylistsFromYoutube(playlists, userId));
    }

};

function importPlaylistsFromYoutube(playlists, userId) {
    let userPlaylists = [];
    for(const item of playlists) {
        let playlist = new Playlist();
        playlist.title = item.snippet.title;
        playlist.link = 'https://www.youtube.com/playlist?list=' + item.id;
        playlist.thumbnail = item.snippet.thumbnails.high.url;
        playlist.user_id = userId
        userPlaylists.push(playlist);
    }
    Playlist.insertMany(userPlaylists, function (err, savedPlaylists) {
        if(err) {
            console.log(err);
        }
        userPlaylists = savedPlaylists;
    });

    return userPlaylists;
}

function importFromSpotify() {

}

function importFromDeezer() {

}
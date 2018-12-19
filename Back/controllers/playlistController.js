Playlist = require('../models/playlistsModel');

exports.getAllPlaylists = function (req, res, next) {
    const userId = req.user.userID;
    Playlist.find({user_id: userId}, function (err, playlists) {
       res.json(playlists);
    });
};

exports.createPlaylist = function (req, res, next) {
    const userId = req.user.userID;
    const playlists = req.body;
    if(Array.isArray(playlists)) {
        importPlaylistsFromYoutube(playlists, userId)
            .then((playlists) => {
                res.json(playlists);
            })
            .catch(err => {
               console.error(err);
               next(err);
            });
    }
};

async function importPlaylistsFromYoutube(playlists, userId) {
    let userPlaylists = [];
    for(const item of playlists) {
        let playlist = new Playlist();
        playlist.title = item.snippet.title;
        playlist.link = 'https://www.youtube.com/playlist?list=' + item.id;
        playlist.thumbnail = item.snippet.thumbnails.high.url;
        playlist.description = item.snippet.description;
        playlist.nbItems = item.contentDetails.itemCount;
        playlist.user_id = userId;
        userPlaylists.push(playlist);
    }

    await Playlist.insertOrUpdateFromYoutube(userPlaylists, userId);

    return userPlaylists;
}

function importFromSpotify() {

}

function importFromDeezer() {

}
Playlist = require('../models/playlistsModel');
const multer = require('multer');
const DIR = './uploads';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const ext = '.' + file.mimetype.split('/')[1];
        require('crypto').pseudoRandomBytes(16, function (err, raw) {
            cb(null, (err ? undefined : raw.toString('hex') ) + ext);
        });
    }
});
let upload = multer({storage: storage}).single('file');

/* CRUD Methods */
exports.getAllPlaylists = function (req, res, next) {
    const userId = req.user.userID;

    Playlist.getUserPlaylists(userId)
        .then((userPlaylists)=> {
            res.json(userPlaylists);
        })
        .catch((err)=> next(err));
};

exports.createPlaylist = function (req, res, next) {
    const userId = req.user.userID;
    const playlist = req.body;

    Playlist.insertPlaylist(playlist, userId)
        .then((savedPlaylist)=> {
            res.json(savedPlaylist);
        })
        .catch((err)=> next(err));
};

exports.deletePlaylist = function (req, res, next) {
    const userId = req.user.userID;
    const playlistId = req.params.id;

    Playlist.deleteUserPlaylist(playlistId, userId)
        .then((deletedPlaylist)=> {
            res.json(deletedPlaylist);
        })
        .catch((err) => next(err));
};

/* Utils methods for Playlists resource */
exports.uploadThumbnail = function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            res.json(req.file.filename);
        }
    });
};

exports.importFromYoutube = function (req, res, next) {
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
    else {
        const playlistToImport = [playlists];
        importPlaylistsFromYoutube(playlistToImport, userId)
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

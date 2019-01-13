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

exports.getPlaylist = function (req, res, next) {
    const userId = req.user.userID;
    const playlistId = req.params.id;

    Playlist.getUserPlaylistById(playlistId, userId)
        .then((userPlaylist)=> {
            res.json(userPlaylist);
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

exports.updatePlaylist = function (req, res, next) {
  const userId = req.user.userID;
  const playlistId = req.params.id;
  const args = req.body;

  if(args.user_id || args.id || args._id || args.link || args.thumbnail || args.nbItems) {
      return res.status(422).send("Only title, description or/and genre can be updated");
  }

  Playlist.updateUserPlaylist(playlistId, userId, args)
      .then((updatedPlaylist)=> {
          res.json(updatedPlaylist);
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

exports.userHasPermession = async function (playlistId, userId, next) {
  await Playlist.checkUserPermission(playlistId, userId)
      .then((hasPermission)=> {
          return hasPermission;
      })
      .catch((err)=> next(err));
};

async function importPlaylistsFromYoutube(playlists, userId) {
    let userPlaylists = [];
    for(const item of playlists) {
        let playlist = {};
        playlist.title = item.snippet.title;
        playlist.link = 'https://www.youtube.com/playlist?list=' + item.id;
        playlist.thumbnail = item.snippet.thumbnails.high.url;
        playlist.description = item.snippet.description;
        playlist.nbItems = item.contentDetails.itemCount;
        playlist.user_id = userId;
        userPlaylists.push(playlist);
    }

    return await Playlist.insertOrUpdateFromYoutube(userPlaylists, userId);
}

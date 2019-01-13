const mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;

/* Setup the schema */
const playlistsSchema = new mongoose.Schema({
   title: {
       type: String,
       required: true
   },
   genre: {
       type: String
   },
   link: {
       type: String
   },
   thumbnail: {
       type: String
   },
   description: {
       type: String
   },
   nbItems: {
       type: Number
   },
   user_id: {
       type: ObjectId,
       required: true
   }
});

playlistsSchema.options.toJSON = {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.user_id;
    }
};

playlistsSchema.statics.insertOrUpdateFromYoutube = async function (playlists, userId) {
    let that = this;
    let promiseArary = [];

    for(let playlist of playlists) {
        promiseArary.push(updateUserPlaylistByLink(playlist, userId, that));
    }

    return await Promise.all(promiseArary);
};

playlistsSchema.statics.insertPlaylist = async function (playlist, userId) {
    const playlistToInsert = new PlayList({
        title: playlist.title,
        genre: playlist.genre,
        link: playlist.link,
        thumbnail: playlist.thumbnail,
        description: playlist.description,
        nbItems: playlist.nbItems,
        user_id: mongoose.Types.ObjectId(userId)
    });

    return await playlistToInsert.save()
};

playlistsSchema.statics.getUserPlaylists = async function (userId) {
    return await this.find({user_id:  mongoose.Types.ObjectId(userId)})
        .exec();
};

playlistsSchema.statics.getUserPlaylistById = async function (playlistId, userId) {
  return await this.findOne({user_id: mongoose.Types.ObjectId(userId),
        _id: mongoose.Types.ObjectId(playlistId)})
        .exec();
};

playlistsSchema.statics.deleteUserPlaylist = async function (playlistId, userId) {
    return await this.findOneAndDelete({user_id: mongoose.Types.ObjectId(userId),
        _id: mongoose.Types.ObjectId(playlistId)})
        .exec();
};

playlistsSchema.statics.updateUserPlaylist = async function (playlistId, userId, playlist) {
  return await this.findOneAndUpdate({user_id: mongoose.Types.ObjectId(userId),
      _id: mongoose.Types.ObjectId(playlistId)},
      playlist,
      {new: true})
      .exec();
};

playlistsSchema.statics.checkUserPermission = async function (playlistId, userId) {
    const playlist = await this.findOne({
        _id: mongoose.Types.ObjectId(playlistId)
        , user_id: mongoose.Types.ObjectId(userId)
    }).exec();

    return !!playlist;
};

/* Static functions */
async function updateUserPlaylistByLink(playlist, userId, that){
    return await that.findOneAndUpdate({ link: playlist.link, user_id: mongoose.Types.ObjectId(userId)},
        playlist,
        {upsert: true, new: true})
        .exec();
}

/* Export Playlist Model and DAO methods */
const PlayList = module.exports = mongoose.model('PlayList', playlistsSchema);
module.exports.get = function (callback, limit) {
    PlayList.find(callback).limit(limit);
};
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

/* Private functions */
function updateUserPlaylistByLink(playlist, userId, that){
    return that.updateOne({ link: playlist.link, user_id: mongoose.Types.ObjectId(userId)},
        {$set: { title: playlist.title, genre: playlist.genre,
            thumbnail: playlist.thumbnail, description: playlist.description, nbItems: playlist.nbItems }},
        {upsert: true}).exec();
}

/* Export Playlist Model and DAO methods */
const PlayList = module.exports = mongoose.model('PlayList', playlistsSchema);
module.exports.get = function (callback, limit) {
    PlayList.find(callback).limit(limit);
};
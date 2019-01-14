const mongoose = require('mongoose');

/* Setup the schema */
const songSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   artist: {
       type: String
   },
   genre: {
       type: String
   },
   link: {
       type: String,
       required: true
   },
   playlist_id: {
       type: ObjectId,
       required: true
   }
});

songSchema.options.toJSON = {
  transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
};

songSchema.statics.insertOrUpdateFromYoutube = async function (songs, playlistId) {
    let that = this;
    let promiseArary = [];

    for(let song of songs) {
        promiseArary.push(updateSongsByLink(song, playlistId, that));
    }

    return await Promise.all(promiseArary);
};

songSchema.statics.insertSong = async function (song) {
    const newSong = new Song({
       name: song.name,
       artist: song.artist,
       genre: song.genre,
       link: song.link,
       playlist_id: song.playlist_id
    });

    return await newSong.save();
};

songSchema.statics.getSongsPlaylist = async function (playlistId) {
  return await this.find({playlist_id: mongoose.Types.ObjectId(playlistId)})
      .exec();
};

songSchema.statics.deleteSong = async function (songId) {
  return await this.findOneAndDelete({
        _id: mongoose.Types.ObjectId(songId)
  }).exec();
};

songSchema.statics.updateSong = async function (songId, songArgs) {
    return await this.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(songId)},
        songArgs, {new: true}
        ).exec();
};

songSchema.statics.getSong = async function (songId) {
  return await this.findOne({_id: mongoose.Types.ObjectId(songId)}).exec();
};

songSchema.statics.getSongsByUser = async function (playlistsId) {
   return await this.find({playlist_id: {$in: playlistsId}}).exec();
};

/* Private functions */
async function updateSongsByLink(song, playlistId, that){
    return await that.findOneAndUpdate({ link: song.link, playlist_id: mongoose.Types.ObjectId(playlistId)},
        song,
        {upsert: true, new: true})
        .exec();
}

/* Export Song model */
const Song = module.exports = mongoose.model('Song', songSchema);
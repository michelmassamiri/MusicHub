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
        delete ret.id;
    }
};

playlistsSchema.statics.insertOrUpdateFromYoutube = async function (playlists, userId, cb) {
    let playlistsToUpdate = [];
    let playlistsToInsert = [];
    let result = [];
    let error = null;

    const criteria = playlists.map(elem => elem.link);
    await this.find({link: {$in: criteria}, user_id:  mongoose.Types.ObjectId(userId)})
        .exec(function (err, dbPlaylists) {
            playlistsToUpdate = playlistsToUpdate.concat(dbPlaylists);
            playlistsToInsert = playlistsToUpdate.filter(elemToUpdate => {
                playlistsToInsert.forEach(elemToInsert => {
                    return elemToUpdate.link !== elemToInsert;
                });
            });
        });

    if(playlistsToInsert.length !== 0) {
        this.insertMany(playlistsToInsert, function (err, res) {
           if(err) {
               console.error(err);
               return cb(err, res);
           }
           else {
               playlistsToInsert = res;
           }
        });
    }

    playlistsToUpdate.forEach(async function (item) {
        await this.updateOne({ 'link': item.link }, item, function (err, response) {
            if(err) {
                console.error(err);
                error = err;
            }
            else {
                result.push(response);
            }
        });
    });

    return cb(error, result.concat(playlistsToInsert));
};

const PlayList = module.exports = mongoose.model('PlayList', playlistsSchema);
module.exports.get = function (callback, limit) {
    PlayList.find(callback).limit(limit);
};
const mongoose = require('mongoose');

/* Setup the schema */
const playlistsSchema = new mongoose.Schema({
   id: {
       type: Number,
       required: true
   },
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

const PlayList = module.exports = mongoose.model('PlayList', playlistsSchema);
module.exports.get = function (callback, limit) {
    PlayList.find(callback).limit(limit);
};
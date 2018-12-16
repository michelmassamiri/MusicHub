const mongoose = require('mongoose');

/* Setup the schema */
const songSchema = new mongoose.Schema({
   id: {
       type: Number,
       required: true
   },
   name: {
       type: String,
       required:true
   },
   genre: {
       type: String,
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
      delete ret.id;
  }
};

const Song = module.exports = mongoose.model('Song', songSchema);
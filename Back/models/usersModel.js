const mongoose = require('mongoose');

/* Setup the schema */
const userSchema = new mongoose.Schema({
    firstname: {
       type: String,
       required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    socialMediasToken: {
        type: Map,
        of: String
    }
});

userSchema.options.toJSON = {
    transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.id;
    }
};

userSchema.statics.upsertSocialMediaUser = function(userToVerify, cb) {
    let that = this;
    return this.findOne({
        'socialMediasToken.google': userToVerify.socialMediasToken.google
    }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {
            let newUser = new that({
                firstname: userToVerify.firstname,
                lastname: userToVerify.lastname,
                email: userToVerify.email,
                socialMediasToken: {
                    google: userToVerify.socialMediasToken.google,
                    spotify: '',
                    deezer: ''
                }
            });

            newUser.save(function(error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

const User = module.exports = mongoose.model('User', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};
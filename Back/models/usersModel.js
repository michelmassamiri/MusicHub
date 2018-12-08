var mongoose = require('mongoose');

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
        of: String,
        select: false
    }
});

userSchema.statics.upsertSocialMediaUser = function(accessToken, refreshToken, profile, cb) {
    let that = this;
    return this.findOne({
        'socialMediasToken.google': accessToken
    }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {
            let newUser = new that({
                firstname: profile.name,
                email: profile.emails[0].value,
                socialMediasToken: {
                    google: accessToken
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

var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};
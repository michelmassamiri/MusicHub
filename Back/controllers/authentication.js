User = require('../models/usersModel');
const socialsIdTokens = require('../oauth2config/oauth2client');

const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(socialsIdTokens.socialsIdClient.googleIdClient);

async function verifyGoogleToken (token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: socialsIdTokens.socialsIdClient.googleIdClient,
    });

    return ticket.getPayload();
}

exports.signInWithGoogle = function (req, res, next) {
    const token = req.get('Authorization-google');
    verifyGoogleToken(token)
        .then((payload)=> {
            console.log(payload);
            const user = {
                firstname: payload['given_name'],
                lastname:  payload['family_name'],
                email: payload['email'],
                socialMediasToken: {
                    google: payload['sub'],
                    spotify: '',
                    deezer: ''
                }
            };

            User.upsertSocialMediaUser(user, function (err, savedUser) {
                const genToken = jwt.sign({userID: savedUser.id},
                    'musicHub-app-shared-secret', {expiresIn: '2h'});
                res.header('generatedToken', genToken);
                res.json(savedUser);
            });
        })
        .catch(console.error);
};
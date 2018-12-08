// import user model
const oath2ClientConfig = require('../oauth2config/oauth2client');
User = require('../models/usersModel');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(oath2ClientConfig.googleIdClient);

exports.verifyGoogleToken = async function (req, res, next) {
    const token = req.get('Authorization');
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '490320770076-pgociv0l4kfqvtufupkengo5clh8ha62.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // TODO :
    /**
     * 1 - Verify if UserID is in the DataBase
     * 2 - if the UserID is in the the DataBase, genereate a JWT Token to Angular.
     * 3 - if not, create a new User in the DataBase and generate a new JWT Token
     */
    res.send(userid);
};
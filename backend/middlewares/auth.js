const jwt = require('jsonwebtoken');
const Utils = require('../utils/utils')
module.exports.checkToken = async (req, res, next) => {
    console.log("checkToken");

    if (!req.headers || !req.headers['authorization']) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }

    if(!req.headers['authorization'].includes('Bearer ')) {
        return res.status(401).send({ auth: false, message: 'Wrong authorization format' });
    }

    if(req.headers['authorization'].split(' ') < 2) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }

    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, Utils.getSecretOrPrivateKey(), function (err, decoded) {
        console.log(decoded);
        if (err) {
            console.log(err);
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.user = decoded;
        next();
    })
}

module.exports.authEmployer = async (req, res, next) => {
    console.log('authEmployer');

    if (!req.user || req.user.role !== 'employer') {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate employer.' });
    }
    next();
}

module.exports.authSeeker = async (req, res, next) => {
    console.log('authSeeker');

    if (!req.user || req.user.role !== 'seeker') {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate seeker.' });
    }
    next();
}
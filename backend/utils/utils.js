const jwt = require('jsonwebtoken');

module.exports = class Utils {

    static getSecretOrPrivateKey() {
        return 'MWA_SECRET';
    }

    static generateJWTToken(payload, secretOrPrivateKey='MWA_SECRET', configs= { expiresIn: '24h' }, callback=null) {
        return jwt.sign(payload, secretOrPrivateKey, configs, callback);
    }

}
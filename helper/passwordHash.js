const crypto = require('crypto');
const hashPass = function (password, secret) {

    const hash = crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');

    console.log(hash)
    return hash
}

module.exports = hashPass
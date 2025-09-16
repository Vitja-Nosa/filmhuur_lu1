const bcrypt = require("bcrypt");

const encrypt = {
    hash: (plainText, callback) => {
        bcrypt.hash(plainText, 10, (err, hash) => {
            console.log(hash)
        })
    },
    compare: (myPlaintextPassword, hash, callback) => {
        bcrypt.compare(myPlaintextPassword, hash, (error, result) => {
            if (error) callback(error, undefined);
            return callback(undefined, result);
        });
    }
}

module.exports = encrypt
const authDao = require('../dao/auth.dao');
const encrypt = require('../util/encrypt');

const authService = {
    login: (email, password, callback) => {
        authDao.login(email, (error, user) => {
            if (error) return callback(error, undefined);
            if (user) {
                encrypt.compare(password, user.password, (error, result) => {
                    if (error) return callback(error, undefined)
                    if (result) {
                        return callback(undefined, user)
                    }
                })
            }
        })
    },
}

module.exports = authService;
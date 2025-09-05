const userDao = require("../dao/user.dao")

const userService = {
    get: (userId, callback) => {
        userDao.get(userId, (error, users) => {
            if (error) return callback(error, undefined)
            if (users) return callback(undefined, users)
        })
    },

    delete: (userId, callback) => {
        userDao.delete(userId, (error, result) => {
            if (error) return callback(error, undefined)
            return callback(undefined)
        })
    }
}

module.exports = userService;
const database = require('../db/sql/connection')

const authDao = {
    login: (email, callback) => {
        database.query(
            "SELECT ??, ?? FROM ?? WHERE ?? = ?",
            [
                'email',
                'password',
                'staff',
                'email', email,
            ],
            (error, user) => {
                if (error) return callback(error, undefined)
                if (user && user.length > 0) {
                    return callback(undefined, user[0])
                } else {
                    let error = new Error("Wrong credentials")
                    return callback(error, null)
                }
            }
        )
    }
}

module.exports = authDao;
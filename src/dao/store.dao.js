const database = require('../db/sql/connection')

const storeDao = {
    get: (callback) => {
        database.query(
            "SELECT ?? FROM ??",
            ["store_id", "store"],
            (error, results) => {
                if (error) return callback(error, undefined)
                else if (results) return callback(undefined, results)
            }
        )
    }
}

module.exports = storeDao;
const database = require('../db/sql/connection')

const cityDao = {
    get: (callback) => {
        database.query(
            "SELECT ??, ?? FROM ??",
            ["city_id", "city", "city"],
            (error, results) => {
                if (error) return callback(error, undefined)
                else if (results) return callback(undefined, results)
            }
        )
    }
}

module.exports = cityDao;
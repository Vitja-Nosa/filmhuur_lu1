const database = require('../db/sql/connection')

const filmDao = {
    get: (callback) => {
        database.query(
            `SELECT ??.*, ??.name AS category FROM ?? INNER JOIN ?? ON ??.film_id = ??.film_id INNER JOIN ?? ON ??.category_id = ??.category_id`,
            ["film", "category", "film", "film_category", "film_category", "film", "category", "film_category", "category"],
            (error, results) => {
                if (error) return callback(error, undefined)
                else if (results) return callback(undefined, results)
            }
        )
    }
}

module.exports = filmDao;

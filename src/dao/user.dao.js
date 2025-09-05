const data = require('../db/sql/example.data');
const database = require('../db/sql/connection')

const userDao = {
    get: (userId, callback) => {
        database.query(
            "SELECT * FROM customer LIMIT 10",
            (error, results) => {
                if (results) console.log("hello wolrd", results);
                if (error) return callback(undefined)
                return callback(results)
            }
        )
        return callback(undefined, [[1]]);
    },

    delete: (userId, callback) => {
        if (userId == undefined) {
            return callback(404, undefined)
        }
        else {
            let user = Object.keys(data).filter((user) => user.id == userId)[0];
            console.log(userId)
            return callback(undefined);
        }
    }
}

module.exports = userDao;
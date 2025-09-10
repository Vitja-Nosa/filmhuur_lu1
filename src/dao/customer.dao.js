const data = require('../db/sql/example.data');
const database = require('../db/sql/connection')

const customerDao = {
    get: (customerId, callback) => {
        database.query(
            customerId == undefined
                ? `SELECT * FROM ??`
                : `SELECT * FROM ?? WHERE ?? = ?`,
            customerId == undefined ? ['customer'] : ['customer', 'customer_id', customerId],
            (error, results) => {
                if (error) return callback(error, undefined);
                console.log(results);
                if (results) return callback(undefined, results)

            }
        );
    },
}

module.exports = customerDao;
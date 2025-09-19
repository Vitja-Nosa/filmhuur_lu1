const database = require('../db/sql/connection')

const rentalDao = {
    delete: (customerId, callback) => {
        database.query(
            'DELETE FROM ?? WHERE ?? = ?',
            ['rental', 'customer_id', customerId],
            (error, results) => {
                if (error) return callback(error, undefined)
                else return callback(undefined, results)
            }
        )
    }
}

module.exports = rentalDao;

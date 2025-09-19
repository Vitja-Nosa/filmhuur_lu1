const database = require('../db/sql/connection')

const paymentDao = {
    delete: (customerId, callback) => {
        database.query(
            'DELETE FROM ?? WHERE ?? = ?',
            ['payment', 'customer_id', customerId],
            (error, results) => {
                if (error) return callback(error, undefined)
                else return callback(undefined, results)
            }
        )
    }
}

module.exports = paymentDao;

const data = require('../db/sql/example.data');
const database = require('../db/sql/connection')

const customerDao = {
    get: (customerId, callback) => {
        database.query(
            customerId == undefined
                ? `SELECT * FROM ??`
                : `SELECT * FROM ?? INNER JOIN address ON customer.address_id = address.address_id WHERE ?? = ?`, //TODO: moet ik hier ook vragentekens neer zetten voor join
            customerId == undefined ? ['customer'] : ['customer', 'customer_id', customerId],
            (error, results) => {
                if (error) return callback(error, undefined);
                console.log(results);
                if (results) return callback(undefined, results)

            }
        );
    },

    update: (customerId, first_name, last_name, email, active, address, phone, callback) => {
        database.query(
            `UPDATE ?? INNER JOIN ?? ON ??.?? = ??.??
            SET ??.?? = ?, 
                ??.?? = ?, 
                ??.?? = ?, 
                ??.?? = ?, 
                ??.?? = ?, 
                ??.?? = ?
            WHERE ??.?? = ?`,
            [
                'customer', 'address',
                'customer', 'address_id',
                'address', 'address_id',

                'customer', 'first_name', first_name,
                'customer', 'last_name', last_name,
                'customer', 'email', email,
                'customer', 'active', active,
                'address', 'address', address,
                'address', 'phone', phone,

                'customer', 'customer_id', customerId
            ],
            (error, results) => {
                if (error) return callback(error, undefined);
                if (results) return callback(undefined, results)
            }
        )
    },

    delete: (customerId, callback) => {
        database.query(
            "DELETE FROM ?? WHERE ?? = ?",
            ["customer", "customer_id", customerId],
            (error, results) => {
                if (error) return callback(error, undefined)
                if (results) return callback(undefined, results)
            }
        )
    }
}

module.exports = customerDao;
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

    update: (customerId, data) => {
        database.query(
            ` UPDATE ?? INNER JOIN ?? ON ??.?? = ??.??
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

                'customer', 'first_name', data.first_name,
                'customer', 'last_name', data.last_name,
                'customer', 'email', data.email,
                'customer', 'active', data.active,
                'address', 'address', data.address,
                'address', 'phone', data.phone,

                'customer', 'id', data.customerId
            ]
        )
    }
}

module.exports = customerDao;
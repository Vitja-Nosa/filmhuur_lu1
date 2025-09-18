const database = require('../db/sql/connection')

const addressDao = {
    create: (address, district, city_id, postal_code, phone, callback) => {
        database.query(
            "INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ST_GeomFromText(?))",
            [
                "address", "address", "district", "city_id", "postal_code", "phone", "location",
                address, district, city_id, postal_code, phone, "POINT(4.123 51.234)"
            ],
            (error, results) => {
                if (error) return callback(error, undefined)
                else if (results) return callback(undefined, results)
            }
        )
    }
}

module.exports = addressDao;
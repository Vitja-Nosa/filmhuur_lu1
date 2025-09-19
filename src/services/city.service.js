const cityDao = require("../dao/city.dao")

const cityService = {
    get: (callback) => {
        cityDao.get((error, results) => {
            if (error) return callback(error, undefined);
            if (results) return callback(undefined, results);
        })
    }
}

module.exports = cityService;
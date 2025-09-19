const storeDao = require("../dao/store.dao")

const storeService = {
    get: (callback) => {
        storeDao.get((error, results) => {
            if (error) return callback(error, undefined);
            if (results) return callback(undefined, results);
        })
    }
}

module.exports = storeService;
const filmDao = require("../dao/film.dao");

const filmService = {
    get: (callback) => {
        filmDao.get((error, films) => {
            if (error) return callback(error, undefined);
            if (films) return callback(undefined, films);
        });
    }
};

module.exports = filmService;

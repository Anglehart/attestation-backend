const initOptions = {
    error(error, e) {
        if (e.cn) {
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error);
        }
    }
};

const pgp = require('pg-promise')(initOptions);
const db = pgp('postgres://postgres:pg@localhost:5432/demo');

module.exports = db;

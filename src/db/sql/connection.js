require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db-mysql-ams3-46626-do-user-8155278-0.b.db.ondigitalocean.com',
    user: process.env.DB_USER || '2230173',
    password: process.env.DB_PASSWORD || 'geheim2',
    database: process.env.DB_DATABASE || '2230173',
    port: process.env.DB_PORT || 25060,
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
});

module.exports = pool;
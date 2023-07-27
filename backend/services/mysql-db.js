// Source: https://blog.logrocket.com/build-rest-api-node-express-mysql/
// Source: https://stackoverflow.com/questions/35858052/how-to-fix-command-not-found-mysql-in-zsh

const mysql = require('mysql2/promise');
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

async function query(sql, params) {
    const connection = await mysql.createConnection(process.env.DB_DATABASE);
    const [results, ] = await connection.execute(sql, params);

    return results
}

modeul.exports = {
    query
}
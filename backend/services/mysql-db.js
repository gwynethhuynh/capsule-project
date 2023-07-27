// Source: https://blog.logrocket.com/build-rest-api-node-express-mysql/
// Source: https://stackoverflow.com/questions/35858052/how-to-fix-command-not-found-mysql-in-zsh
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({path:__dirname+'/../config/config.env'})

// async function query(sql, params) {
//     const connection = await mysql.createConnection(process.env.DB_DATABASE);
//     const [results, ] = await connection.execute(sql, params);

//     return results
// }

// modeul.exports = {
//     query
// }
// var mysql = import('mysql');
// console.log(process.env.DB_HOST);

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
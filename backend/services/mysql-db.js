// Source: https://blog.logrocket.com/build-rest-api-node-express-mysql/
// Source: https://stackoverflow.com/questions/35858052/how-to-fix-command-not-found-mysql-in-zsh
// Source: https://blog.logrocket.com/build-rest-api-node-express-mysql/ 
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

// export function query(params) {
//   const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
//   });
//   connection.query(params, (err, rows) => {
//     if (err) throw err;
//     console.log('The data from users table are: \n', rows);
//     connection.end();
//     return rows;
    
//   });


const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});


dbConnection.connect((error) => {
  if (error) {
      if (error.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.');
      }
      if (error.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.');
      }
      if (error.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.');
      }
  } else {
      console.log('Database connected');
  }
});



export default dbConnection;

  
  // const rows = await connection.execute(sql, params);

// var con = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });
// console.log(con)

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// con.query('SELECT * from shirts', (err, rows) => {
//     if (err) throw err;
//     console.log('The data from users table are: \n', rows);
//     con.end();
// });

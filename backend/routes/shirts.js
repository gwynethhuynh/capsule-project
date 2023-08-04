import express from 'express';
import dbConnection from '../services/mysql-db.js';
import * as Clothes from '../services/clothes.js';

export const router = express.Router();
// Get shirts
router.get('/shirts', function(req, res, next) {
    try {
        console.log("ENTERED SHIRTS ROUTES");
        let sqlQuery = 'SELECT * from shirts';
        dbConnection.query(sqlQuery, (error, results) => {
            if (error) {
                console.log("THERE WAS AN ERROR TRYING TO QUERY!");
                throw error;
            } 
            console.log("WE WERE ABLE TO QUERY!");
            console.log(results);   
            res.status(200).json(results);
        });
    } catch (err) {
        console.error("Error while getting shirts", err.message);
        next(err);
    }
});




// Source: https://github.com/FedeBerbara/RestAPI-Node-Express-MySQL/blob/master/src/controllers/customerController.js 
import express from 'express';
import dbConnection from '../services/mysql-db.js';

export const router = express.Router();

router.get('/bottoms', function(req, res, next) {
    try {
        console.log("ENTERED BOTTOMS ROUTES");
        let sqlQuery = 'SELECT * from bottoms';
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
        console.error("Error while getting bottoms", err.message);
        next(err);
    }
});
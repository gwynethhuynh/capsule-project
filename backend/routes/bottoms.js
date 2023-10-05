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
            console.log("WE WERE ABLE TO QUERY BOTTOMS!");
            console.log(results);  
            var img_urls = [];
            while (results.length > 0) {
                img_urls.push(results.pop().bottom_img_url);
            }   
            res.status(200).json(img_urls); 
        });
    } catch (err) {
        console.error("Error while getting bottoms", err.message);
        next(err);
    }
});

// Get shirt by shirt_id
router.get('/bottom-image/:id', function(req, res, next) {
    // 
    let sqlQuery = `SELECT bottom_img_url FROM bottoms WHERE bottom_id = '${req.params.id}'`;
    dbConnection.query(sqlQuery, (error, results) => {
        if (error) {
            console.log("THERE WAS AN ERROR TRYING TO QUERY!");
            throw error;
        } 
        console.log("WE WERE ABLE TO QUERY!");
        console.log(results[0])
        console.log(results[0].bottom_img_url); 
        res.status(200).json(results[0].bottom_img_url);
    });
});

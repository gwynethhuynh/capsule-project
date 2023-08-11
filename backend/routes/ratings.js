// Source: https://github.com/FedeBerbara/RestAPI-Node-Express-MySQL/blob/master/src/controllers/customerController.js 
import express from 'express';
import dbConnection from '../services/mysql-db.js';
import multer from 'multer';
import async from 'async';


export const router = express.Router();
const upload = multer()
// Get shirts
router.get('/ratings', function(req, res, next) {
    try {
        console.log("ENTERED RATINGS ROUTES");
        let sqlQuery = 'SELECT * from ratings';
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
        console.error("Error while getting ratings", err.message);
        next(err);
    }
});
var shirtID;
var bottomID;

const setShirtID = (value) => {
    shirtID = value;
    console.log("SHIRTID", shirtID);
}
const setBottomID = (value) => {
    bottomID = value;
    console.log("BOTTOMID", bottomID);
}

const getShirtID = (query) => {
    dbConnection.query(query, (error, results) => {
        if (error) {
            console.log("THERE WAS AN ERROR TRYING TO QUERY SHIRTS/BOTTOMS!");
            throw error;
        } 
        console.log(results[0].shirt_id);
        setShirtID(results[0].shirt_id);
    });
}

const getBottomID = (query) => {
    dbConnection.query(query, (error, results) => {
        if (error) {
            console.log("THERE WAS AN ERROR TRYING TO QUERY SHIRTS/BOTTOMS!");
            throw error;
        } 
        console.log(results[0].bottom_id);
        setBottomID(results[0].bottom_id);
    });
}

router.post('/ratings',upload.none(), function(req, res, next) {
    console.log("ENTERED RATINGS POST");
    console.log("req.body", req.body);

    try {
        // Get shirt ID

        const shirtIDQuery = ["SELECT shirt_id FROM shirts WHERE shirt_img_url='", req.body.shirtURL, "'"].join('');
        // dbConnection.query(shirtIDQuery, (error, results) => {
        //     if (error) {
        //         console.log("THERE WAS AN ERROR TRYING TO QUERY SHIRTS!");
        //         throw error;
        //     } 
        //     console.log(results[0].shirt_id)
        //     setShirtID(results[0].shirt_id)
        // });
        // Get bottom ID
        
        const bottomIDQuery = ["SELECT bottom_id FROM bottoms WHERE bottom_img_url='", req.body.bottomURL, "'"].join('');
        // dbConnection.query(bottomIDQuery, (error, results) => {
        //     if (error) {
        //         console.log("THERE WAS AN ERROR TRYING TO QUERY SHIRTS!");
        //         throw error;
        //     } 
        //     setBottomID(results[0].bottom_id);
        // });
        // Setup Query
        async.parallel([
            function(parallel_done) {
                dbConnection.query(shirtIDQuery, (error, results) => {
                    if (error) {
                        console.log("THERE WAS AN ERROR TRYING TO QUERY SHIRTS!");
                        parallel_done(error);
                    } 
                    // console.log(results[0].shirt_id)
                    setShirtID(results[0].shirt_id)
                    parallel_done();
                 });
            },
            function(parallel_done) {
                dbConnection.query(bottomIDQuery, (error, results) => {
                    if (error) {
                        console.log("THERE WAS AN ERROR TRYING TO QUERY SHIRTS!");
                        parallel_done(error);
                    } 
                    setBottomID(results[0].bottom_id);
                    parallel_done();
                });               
            }

        ], function(err) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log("ID's", shirtID, bottomID);
            const query = 'INSERT INTO ratings (shirt_id, bottom_id, rating) VALUES ?';
            var values = [[shirtID, bottomID, req.body.rating]]
            // Save rating into database
            dbConnection.query(query, [values], (error, result) => {
                if (error) {
                    console.log("THERE WAS AN ERROR TRYING TO INPUT RATINGS!");
                    throw error;
                } 
                console.log("WE WERE ABLE TO QUERY!");
                console.log("Number of records inserted: " + result.affectedRows);
                console.log(result);  
                res.status(200).json(result); 
            });
        })


    }catch (err) {
        console.error("Error while getting shirts", err.message);
        next(err);
    }
});






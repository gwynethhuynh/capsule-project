// Source: https://github.com/FedeBerbara/RestAPI-Node-Express-MySQL/blob/master/src/controllers/customerController.js 
import express from 'express';
import dbConnection from '../services/mysql-db.js';
import multer from 'multer';
import async from 'async';
import {spawn} from 'child_process';


export const router = express.Router();
const upload = multer()



var shirtIDList = [];
var bottomIDList = [];
var ratingsList = [];




const setShirtIDList = (value) => {
    shirtIDList = value;
    console.log("SHIRTID LIST", shirtIDList);
}
const setBottomIDList = (value) => {
    bottomIDList = value;
    console.log("BOTTOMID LIST", bottomIDList);
}
const setRatingsList = (value) => {
    ratingsList = value;
    console.log("RATING LIST", ratingsList);
}

const shirtsToArray = (list) => {
    var shirtArray = [];
    for (let i = 0; i < list.length; i++) {
        shirtArray.push(list[i].shirt_id);
    };
    return shirtArray;
}
const bottomsToArray = (list) => {
    var bottomArray = [];
    for (let i = 0; i < list.length; i++) {
        bottomArray.push(list[i].bottom_id);
    }   
    return bottomArray;
}

const ratingsToArray = (list) => {
    var ratingArray = [];
    for (let i = 0; i < list.length; i++) {
        ratingArray.push(list[i].shirt_id);
        ratingArray.push(list[i].bottom_id);
        ratingArray.push(list[i].rating);
    }   
    return ratingArray;
}
// Get ratings and return client a recommended shirt and bottom
router.get('/ratings', function(req, res, next) {

    // Get list of shirt_id's, bottom_id's, and ratings
    const shirtIDQuery = 'SELECT shirt_id FROM shirts';
    const bottomIDQuery = 'SELECT bottom_id FROM bottoms';
    const ratingsQuery = 'SELECT shirt_id, bottom_id, rating FROM ratings';
    async.parallel([
        function(parallel_done) {
            dbConnection.query(shirtIDQuery, (error, results) => {
                if (error) {
                    console.log("THERE WAS AN ERROR TRYING TO QUERY SHIRTS!");
                    parallel_done(error);
                } 
                console.log("SHIRTID RESULTS", results)
                setShirtIDList(results)
                parallel_done();
             });
        },
        function(parallel_done) {
            dbConnection.query(bottomIDQuery, (error, results) => {
                if (error) {
                    console.log("THERE WAS AN ERROR TRYING TO QUERY SHIRTS!");
                    parallel_done(error);
                } 
                console.log("BOTTOMID RESULTS", results)
                setBottomIDList(results);
                
                parallel_done();
            });               
        },
        function(parallel_done) {
            dbConnection.query(ratingsQuery, (error, results) => {
                if (error) {
                    console.log("THERE WAS AN ERROR TRYING TO QUERY SHIRTS!");
                    parallel_done(error);
                } 
                console.log("RATINGS RESULTS", results)
                setRatingsList(results);
                
                parallel_done();
            });               
        }


    ], function(err) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("LISTS", shirtIDList, bottomIDList, ratingsList);
            // Spawn python process and send db data to it
        const pythonProcess = spawn('python',["./services/collab_filtering.py",  shirtsToArray(shirtIDList), bottomsToArray(bottomIDList), ratingsToArray(ratingsList)]);
        pythonProcess.stdout.on('data', (data) => {
        console.log("GOT DATA FROM PYTHON!", data);
        // res.status(200).json(data);
        res.send(data.toString());
        })
        pythonProcess.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
        pythonProcess.on('error', (error) => console.log(`error: ${error.message}`));

        pythonProcess.on('exit', (code, signal) => {
            if (code) console.log(`Process exit with code: ${code}`);
            if (signal) console.log(`Process killed with signal: ${signal}`);
            console.log(`Done`);
        })
    })

    // pythonProcess.kill();

    // try {
    //     // Get list of shirt and bottom ID's
    //     // Get list of ratings
    //     // Send 3 lists to collaborative filtering service (written in python)
    //     // Should receive shirt_id and bottom_id of outfit the service recommends to client
    //     // Send shirt_id and bottom_id to client
    //     console.log("ENTERED RATINGS ROUTES");
    //     let sqlQuery = 'SELECT * from ratings';
    //     dbConnection.query(sqlQuery, (error, results) => {
    //         if (error) {
    //             console.log("THERE WAS AN ERROR TRYING TO QUERY!");
    //             throw error;
    //         } 
    //         console.log("WE WERE ABLE TO QUERY!");
    //         console.log(results);   
    //         res.status(200).json(results);
    //     });
    // } catch (err) {
    //     console.error("Error while getting ratings", err.message);
    //     next(err);
    // }
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

router.post('/ratings',upload.none(), function(req, res, next) {
    console.log("ENTERED RATINGS POST");
    console.log("req.body", req.body);

    try {
        const shirtIDQuery = ["SELECT shirt_id FROM shirts WHERE shirt_img_url='", req.body.shirtURL, "'"].join('');
        const bottomIDQuery = ["SELECT bottom_id FROM bottoms WHERE bottom_img_url='", req.body.bottomURL, "'"].join('');
        async.parallel([
            function(parallel_done) {
                dbConnection.query(shirtIDQuery, (error, results) => {
                    if (error) {
                        console.log("THERE WAS AN ERROR TRYING TO QUERY SHIRTS!");
                        parallel_done(error);
                    } 
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






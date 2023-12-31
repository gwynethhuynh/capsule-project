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
    console.log("SHIRTS TO ARRAY: ", shirtArray)
    return shirtArray;
}
const bottomsToArray = (list) => {
    var bottomArray = [];
    for (let i = 0; i < list.length; i++) {
        bottomArray.push(list[i].bottom_id);
    }   
    console.log("Bottoms TO ARRAY: ", bottomArray)
    return bottomArray;
}

const ratingsToArray = (list) => {
    var ratingArray = [];
    for (let i = 0; i < list.length; i++) {
        ratingArray.push(list[i].shirt_id);
        ratingArray.push(list[i].bottom_id);
        ratingArray.push(list[i].rating);
    }   
    console.log("Rating TO ARRAY: ", ratingArray)
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
                console.log("RATINGS RESULTS", results);
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
            console.log("DATAAAAAA", data.toString());
            const parts = data.toString().split(" ");
            var shirt_id = parseInt(parts[0], 10)
            var bottom_id = parseInt(parts[1], 10)
            console.log("GOT DATA FROM PYTHON!", shirt_id, bottom_id);
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

        // Look up shirt and bottom url by ID's
        
    })
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

// Middleware for retrieving shirt ID from the database
const getShirtID = (req, res, next) => {
    const shirtIDQuery = ["SELECT shirt_id FROM shirts WHERE shirt_img_url='", req.body.shirtURL, "'"].join('');
    dbConnection.query(shirtIDQuery, (error, results) => {
      if (error) {
        console.error("Error querying for shirt ID", error.message);
        next(error);
      } else {
        req.shirtID = results[0].shirt_id;
        next();
      }
    });
  };

// Middleware for retrieving bottom ID from the database
const getBottomID = (req, res, next) => {
    const bottomIDQuery = ["SELECT bottom_id FROM bottoms WHERE bottom_img_url='", req.body.bottomURL, "'"].join('');
    dbConnection.query(bottomIDQuery, (error, results) => {
      if (error) {
        console.error("Error querying for bottom ID", error.message);
        next(error);
      } else {
        req.bottomID = results[0].bottom_id;
        next();
      }
    });
  };

// Middleware for inserting rating into the database
const insertRating = (req, res, next) => {
    try {
      const query = 'INSERT INTO ratings (shirt_id, bottom_id, rating) VALUES (?, ?, ?)';
      const values = [req.shirtID, req.bottomID, req.body.rating];
  
      dbConnection.query(query, values, (error, result) => {
        if (error) {
          console.error("Error inserting rating into the database", error.message);
          next(error);
        } else {
          console.log("Rating inserted successfully");
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.error("Error while inserting rating", error.message);
      next(error);
    }
  };

// Route handler using the middleware functions
router.post('/ratings', upload.none(), getShirtID, getBottomID, insertRating);




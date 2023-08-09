// Source: https://github.com/FedeBerbara/RestAPI-Node-Express-MySQL/blob/master/src/controllers/customerController.js 
import express from 'express';
import dbConnection from '../services/mysql-db.js';
import { PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../services/s3Client.js";
import multer from 'multer'


export const router = express.Router();


// Set up multer middleware for handling multipart/form-data (image upload)
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
upload.single('image')

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

router.post('/shirts', upload.single('image'), function(req, res, next) {
    try {
        // Receive request that contains image blob, filename, type (shirt or bottoms)
        console.log("ENTERED SHIRTS POST");
        // console.log(req.body.image);
        console.log("req.body", req.body)
        console.log("req.file", req.file)
        res.status(200).json(req.body);

    }catch (err) {
        console.error("Error while getting shirts", err.message);
        next(err);
    }
});




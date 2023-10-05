// Source: https://github.com/FedeBerbara/RestAPI-Node-Express-MySQL/blob/master/src/controllers/customerController.js 
import express from 'express';
import dbConnection from '../services/mysql-db.js';
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../services/s3Client.js";
import multer from 'multer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({path:__dirname+'/../config/config.env'});
const randomImageName = (bytes = 32) => crypto.randomBytes(16).toString('hex');

export const router = express.Router();


// Set up multer middleware for handling multipart/form-data (image upload)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
upload.single('image');

// Get list of shirts
router.get('/shirt-images', function(req, res, next) {
    // TODO: Implement pagination
    try {
        let sqlQuery = 'SELECT shirt_img_url FROM shirts';
        dbConnection.query(sqlQuery, (error, results) => {
            if (error) {
                console.error("Error while querying the database:", error);
                return next(error);
            } 
            const imgUrls = results.map(result => result.shirt_img_url);
            res.status(200).json(imgUrls);
        });
    } catch (err) {
        console.error("Error while getting shirts", err.message);
        next(err);
    }
});

// Get shirt by shirt_id
router.get('/shirt-image/:id', function(req, res, next) {
    // Validate that req.params.id is a positive integer
    const shirtId = parseInt(req.params.id);
    if (isNaN(shirtId) || shirtId <= 0) {
        return res.status(400).json({ error: 'Invalid shirt ID' });
    }
    let sqlQuery = `SELECT shirt_img_url FROM shirts WHERE shirt_id = ?`;
    dbConnection.query(sqlQuery, [shirtId], (error, results) => {
        if (error) {
            console.log('Error querying the database:', error);
            throw res.status(500).json({ error: 'Internal Server Error' });
        } 
        if (results.length == 0) {
            return res.status(404).json({error: 'Shirt not found'});
        }

        const shirtImageURL = results[0].shirt_img_url;
        console.log('Successfully queried the database:', shirtImageURL);
        res.status(200).json({shirt_img_url: shirtImageURL})
    });
});


// Middleware for handling file upload to S3
const uploadToS3 = (req, res, next) => {
    try {
      const fileKey = randomImageName();
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const putCommand = new PutObjectCommand(params)
      // Use the promise returned by send() to handle success or error
      s3Client.send(putCommand)
        .then(() => {
            // Attach the fileKey and URL to the request object for later use
            req.uploadedFileKey = fileKey;
            req.uploadedFileUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileKey}`;
            next();
        })
        .catch((err) => {
        console.error("Error while uploading to S3", err.message);
        next(err); // Pass the error to the error-handling middleware
    });
  
      // Attach the fileKey and URL to the request object for later use
      req.uploadedFileKey = fileKey;
      req.uploadedFileUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileKey}`;
  
      next();
    } catch (err) {
      console.error("Error while uploading to S3", err.message);
      next(err);
    }
};
  
// Middleware for handling database insertion
const insertIntoDatabase = (req, res, next) => {
    try {
        console.log("We're in the insert database!");
        let query;
        let values;

        if (req.body.category === 'shirt') {
            query = 'INSERT INTO shirts (shirt_file_name, shirt_img_url) VALUES ?';
        } else if (req.body.category === 'bottom') {
            query = 'INSERT INTO bottoms (bottom_file_name, bottom_img_url) VALUES ?';
        } else {
            throw new Error("Category undefined");
        }

        values = [[req.uploadedFileKey, req.uploadedFileUrl]];

        dbConnection.query(query, [values], (error, result) => {
        if (error) {
            console.error("Error while querying the database", error.message);
            next(error);
            return;
        }

        console.log("Number of records inserted: " + result.affectedRows);
        console.log(result);
        res.status(200).json(req.body);
        });
    } catch (err) {
        console.error("Error while inserting into the database", err.message);
        next(err);
    }
};

// Your route handler using the middleware functions
router.post('/shirts', upload.single('image'), uploadToS3, insertIntoDatabase);
  
  




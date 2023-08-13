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
            console.log(results[0]); 
            var img_urls = [];
            while (results.length > 0) {
                img_urls.push(results.pop().shirt_img_url);
            }   
            res.status(200).json(img_urls);
        });
    } catch (err) {
        console.error("Error while getting shirts", err.message);
        next(err);
    }
});

// Get shirt by shirt_id
router.get('/shirts/:id', function(req, res, next) {
    // 
    let sqlQuery = `SELECT shirt_img_url FROM shirts WHERE shirt_id = '${req.params.id}'`;
    dbConnection.query(sqlQuery, (error, results) => {
        if (error) {
            console.log("THERE WAS AN ERROR TRYING TO QUERY!");
            throw error;
        } 
        console.log("WE WERE ABLE TO QUERY!");
        console.log(results[0].shirt_img_url); 
        res.status(200).json(results[0].shirt_img_url);
    });
});

router.post('/shirts', upload.single('image'), async function(req, res, next) {
    try {
        // Receive request
        console.log("ENTERED SHIRTS POST");
        console.log("req.body", req.body.category);
        console.log("req.file", req.file);

        // Create random file name for image
        const fileKey = randomImageName();
        // Upload image file to s3
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileKey,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
          }
        const putCommand = new PutObjectCommand(params)
        s3Client.send(putCommand)
        res.status(200).json(req.body);

        // Get s3 url for image
        const url = ['https://', process.env.BUCKET_NAME, '.s3.', process.env.S3_REGION, '.amazonaws.com/', fileKey].join('')
        console.log(url)
        var query;

        // Setup Query
        if (req.body.category == 'shirt') {
            query = ['INSERT INTO', 'shirts', '(shirt_file_name, shirt_img_url)', 'VALUES', '?'].join(' ')
        } else if (req.body.category == 'bottom'){
            query = ['INSERT INTO', 'bottoms', '(bottom_file_name, bottom_img_url)', 'VALUES', '?'].join(' ')
        } else {
            throw new Error("Category undefined");
        }
        var values = [[fileKey, url]]
        console.log("QUERY", query)

        // Save image info to database (imageURL, fileName, shirtName?)
        dbConnection.query(query, [values], (error, result) => {
            if (error) {
                console.log("THERE WAS AN ERROR TRYING TO QUERY!");
                throw error;
            } 
            console.log("WE WERE ABLE TO QUERY!");
            console.log("Number of records inserted: " + result.affectedRows);
            console.log(result);   
        });

    }catch (err) {
        console.error("Error while getting shirts", err.message);
        next(err);
    }
});




// Source: https://github.com/FedeBerbara/RestAPI-Node-Express-MySQL/blob/master/src/controllers/customerController.js 
import express from 'express';
import dbConnection from '../services/mysql-db.js';

export const router = express.Router();

router.get('/bottom-images', function(req, res, next) {
    // TODO: Implement pagination
    try {
        let sqlQuery = 'SELECT bottom_img_url FROM bottoms';
        dbConnection.query(sqlQuery, (error, results) => {
            if (error) {
                console.error("Error while querying the database:", error);
                return next(error);
            } 
            const imgUrls = results.map(result => result.bottom_img_url);
            res.status(200).json(imgUrls);
        });
    } catch (err) {
        console.error("Error while getting bottoms", err.message);
        next(err);
    }
});

// Get bottom by bottom_id
router.get('/bottom-image/:id', function(req, res, next) {
    try {
        const bottomId = parseInt(req.params.id);

        if (isNaN(bottomId) || bottomId <= 0) {
            return res.status(400).json({ error: 'Invalid bottom ID' });
        }

        const sqlQuery = 'SELECT bottom_img_url FROM bottoms WHERE bottom_id = ?';
        dbConnection.query(sqlQuery, [bottomId], (error, results) => {
            if (error) {
                console.error("Error while querying the database:", error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Bottom not found' });
            }

            const bottomImageUrl = results[0].bottom_img_url;
            console.log("Successfully queried the database:", bottomImageUrl);
            res.status(200).json({ bottom_img_url: bottomImageUrl });
        });
    } catch (err) {
        console.error("Error while getting bottom", err.message);
        next(err);
    }
});

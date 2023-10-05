import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as shirtRouter from './routes/shirts.js';
import * as bottomRouter from './routes/bottoms.js';
import * as ratingRouter from './routes/ratings.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// dotenv.config({ path: './config/config.env' });
dotenv.config({path:__dirname+'/config/config.env'})

const app = express();

const jsonParser = bodyParser.json()

app.use(cors());
// app.use(express.urlencoded());
app.get('/', (req, res) => res.send('Server running'));

console.log(shirtRouter);
app.get('/shirt-images', shirtRouter.router);
app.get('/shirt-image/:id', shirtRouter.router);
app.post('/shirts', jsonParser, shirtRouter.router);
app.get('/bottom-images', bottomRouter.router);
app.get('/bottom-image/:id', bottomRouter.router);
app.get('/ratings', ratingRouter.router);
app.post('/ratings', ratingRouter.router);

// DELETE LATER

console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.PORT);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
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

app.get('/', (req, res) => res.send('Server running'));

const people = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Brown' },
    { id: 4, name: 'Emily Johnson' },
    { id: 5, name: 'David Jones' },
    { id: 6, name: 'Sarah Davis' },
    { id: 7, name: 'Kevin Wilson' },
    { id: 8, name: 'Laura Taylor' },
    { id: 9, name: 'Richard Williams' },
    { id: 10, name: 'Emma White' },
  ];
  
  app.get('/api/people', (req, res) => {
    res.json(people);
  });
console.log(shirtRouter);
app.get('/shirts', shirtRouter.router);
app.post('/shirts', jsonParser, shirtRouter.router);
// app.post('/shirts', jsonParser, shirtRouter.router);
app.get('/bottoms', bottomRouter.router);
app.get('/ratings', ratingRouter.router);

// DELETE LATER

console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.PORT);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
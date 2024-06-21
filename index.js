import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBConnection from './database/db.js'
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.port || 8000;

const app = express();
// Middleware to parse JSON
app.use(express.json())

app.use(cors());
app.use('/auth', router);

DBConnection();

app.listen(port, () => { console.log(`Server is running on port ${port}`); })
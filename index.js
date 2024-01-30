process.on('uncaughtException',err => console.log(err))
import express from 'express'
import dotenv from "dotenv"
import { initApp } from './src/initApp.js';
import { dbConnection } from './DB/dbConnection.js';
dotenv.config()
dbConnection();
const app = express()
const port = process.env.PORT
app.use('/uploads', express.static('uploads'));
app.use(express.json());
initApp(app);
process.on('unhandledRejection',err => console.log(err))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
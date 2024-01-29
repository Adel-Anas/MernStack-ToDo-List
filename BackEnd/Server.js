/* eslint-disable no-undef */
import env from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './Routes/Route';
const app = express();
const PORT = 4001;
env.config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=> {
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log('Error connecting to MongoDB' + err);
})

app.use('/api', router)

app.listen(PORT, ()=>{
  console.log(`Server is Running on Port : ${PORT}`)
})
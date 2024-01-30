/* eslint-disable no-undef */
import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './Routes/Route.js';
const app = express();
const PORT = 4001;
env.config();

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}))

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
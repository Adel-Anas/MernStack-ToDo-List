import express from 'express';
const app = express();
const PORT = 4001;



app.listen(PORT, ()=>{
  console.log(`Server is Running on Port : ${PORT}`)
})
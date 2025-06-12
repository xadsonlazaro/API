
import express from "express";
import mongoose from "mongoose"; 
import dotenv from "dotenv"; 
import colors from "colors"; 

import authRoutes from "./routes/autoRots.js"
dotenv.config(); 
const app = express(); 
app.use(express.json()); 

app.use('/api', authRoutes)

mongoose.connect(process.env.MONGO_URL)
.then( () => { 
  console.log(`MongoDB conectado`.italic.green); 
  app.listen(process.env.PORT, () => { 
    console.log(`serveridor rodando na porta ${process.env.PORT}`.italic.red); 
  });
})
.catch( (err) => console.error(err))
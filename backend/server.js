import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './database/db.js'
import userRoute from './routes/user.routes.js'
import postRoute from './routes/post.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express()
app.use(cors({
    origin: 'http://localhost:5173', // Aapke frontend ka address
    credentials: true
})); 
app.use(express.json())
app.use(cookieParser());
const PORT = process.env.PORT || 3000

// Database connect first
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on ${PORT}`)
  })
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err.message)
})

// Routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/posts", postRoute); 

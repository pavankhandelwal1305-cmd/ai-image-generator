import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())

const allowedOrigins = [
  "https://ai-image-generator-three-mocha.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

await connectDB()
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/', (req, res)=>{
    return res.send("API WORKING")
})

app.listen(PORT, ()=>console.log("Server running on port " + PORT))
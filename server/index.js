import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

// JSON text
//       ↓
// express.json()
//       ↓
// JavaScript Object
app.use(cors());

// Frontend
// localhost:5173

// ↓

// Backend
// localhost:5000  browser not allow but this allowa - cors to communicate

connectDB();

app.get("/api/health", (req, res)=>{
    res.json({
        status: "ok",
        message: "Server is Running"
    });
});
// app.get(path, callback);
// (req, res) => {
//     // Handle request
// }
const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
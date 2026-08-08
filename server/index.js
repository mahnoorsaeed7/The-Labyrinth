import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import pathRoutes from "./routes/paths.js";

dotenv.config();
const app = express();
// Parse incoming JSON request bodies
// JSON Text
//      ↓
// express.json()
//      ↓
// JavaScript Object
app.use(express.json());
// Parse cookies from incoming requests
app.use(cookieParser());
// Enable Cross-Origin Requests
// Frontend (localhost:5173)
//            ↓
// Browser blocks cross-origin requests by default
//            ↓
// CORS allows communication with Backend (localhost:5000)
const allowedOrigin = process.env.CLIENT_URL;

app.use(
  cors({
    origin: allowedOrigin, // Vite development server
    credentials: true,               // Allow cookies to be sent
  })
);
connectDB();
// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/paths", pathRoutes);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is Running",
  });
});

// Example:
// app.get(path, callback)
//
// app.get("/example", (req, res) => {
//   res.send("Hello World");
// });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on PORT ${PORT}`);
});
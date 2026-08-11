import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import pathRoutes from './routes/paths.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS: allow local and production origins, including Vercel preview URLs
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        'http://localhost:5173',
        'https://labyrinth-client.vercel.app',
        process.env.CLIENT_URL
      ];
      // Allow if origin is in the list, or if it's a Vercel preview domain, or if no origin (e.g. server-to-server)
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Connect to MongoDB (await inside async function)
const start = async () => {
  try {
    await connectDB();
    console.log('Database connected');
  } catch (err) {
    console.error('Failed to connect to database:', err);
    // In serverless, we don't exit, just log – Vercel will handle the error
  }
};
start();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/paths', pathRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is Running' });
});

// Export app for Vercel (serverless)
export default app;

// For local development only – start the server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is listening on PORT ${PORT}`);
  });
}
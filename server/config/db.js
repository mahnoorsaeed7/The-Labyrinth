import dns from 'node:dns';
import mongoose from 'mongoose';

dns.setServers(['1.1.1.1', '8.8.8.8']);

const connectDB = async () => {
 
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }


  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected to host: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.error('MongoDB Connection Failed:', error);
    throw error;
  }
};

export default connectDB;
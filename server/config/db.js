import dns from 'node:dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);
// specific public domain name servers 
import mongoose from "mongoose";

const connectDB = async () => {
   try {
       const conn = await mongoose.connect(process.env.MONGODB_URI);
       
       console.log(`MongoDB Connected successfully to host: ${conn.connection.host}`)
    
   } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    
   }
};

export default connectDB;
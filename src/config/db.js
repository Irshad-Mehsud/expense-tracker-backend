import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@irshadcluster.w5dqwxs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=IrshadCluster`;
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
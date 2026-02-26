import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import serverless from "serverless-http";
import routes from "./src/routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true,
  })
);

const ENV = process.env;

// MongoDB connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000,
  family: 4, // Force IPv4
};

// Use Atlas directly
const MONGO_URI = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@irshadcluster.w5dqwxs.mongodb.net/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=IrshadCluster`;

mongoose
  .connect(MONGO_URI, mongooseOptions)
  .then(() => console.log(chalk.white.bgGreen(`------Connected to MongoDB Atlas----`)))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.log(chalk.red("\n⚠️  Troubleshooting tips:"));
    console.log("1. Check if your IP is whitelisted in MongoDB Atlas (Network Access)");
    console.log("2. Verify your DB credentials in .env file");
    console.log("3. Check your internet connection");
  });

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// ✅ Export for Vercel serverless function
export const handler = serverless(app);

// ✅ Local server (only runs locally, not on Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}
module.exports = app; // For testing purposes
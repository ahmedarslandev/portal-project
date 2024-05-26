import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connection;
    if (db.readyState === 1) {
      console.log("MongoDB is already connected");
      return;
    } else {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(process.env.MONGODB_URI as any);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log("Error while connecting to MongoDB", error);
  }
};

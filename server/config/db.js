import mongoose from "mongoose";

/**
 * connectDB
 * Establishes a connection to MongoDB using the MONGO_URI environment variable.
 * Call this once at server startup (before app.listen).
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit the process so the server doesn't start without a database
    process.exit(1);
  }
};

export default connectDB;

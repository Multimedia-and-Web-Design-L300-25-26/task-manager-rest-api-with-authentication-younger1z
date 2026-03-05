import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // For tests, always create an in-memory MongoDB instance
    if (process.env.NODE_ENV === "test") {
      mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
    } else if (!uri) {
      // For non-test environments without a URI, create a memory server
      mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed", error);
    if (mongod) {
      await mongod.stop();
    }
    // Don't exit if running tests
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDB;
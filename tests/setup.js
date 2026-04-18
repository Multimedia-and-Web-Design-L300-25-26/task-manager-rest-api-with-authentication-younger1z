import dotenv from "dotenv";
import connectDB from "../src/config/db.js";

// Set test environment early
process.env.NODE_ENV = "test";

// Load .env file
dotenv.config();

// Connect to database before running tests
console.log("Setting up test environment...");
try {
  await connectDB();
  console.log("Test database connected successfully");
} catch (error) {
  console.error("Failed to connect to test database:", error);
  process.exit(1);
}

// Cleanup via afterAll hook in tests is handled there
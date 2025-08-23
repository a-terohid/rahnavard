import mongoose from "mongoose";

/**
     * Connects to the MongoDB database using Mongoose.
     * - Checks if a connection is already established before attempting to reconnect.
     * - Uses the connection string from the environment variable MONGO_URI.
     * - Disables strict query mode for more flexible queries.
 */

async function connectDB() {
    try {
        // If already connected, do nothing
        if (mongoose.connections[0].readyState) return;

        // Allow queries that are not strictly defined in schemas
        mongoose.set("strictQuery", false);

        // Connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI || "");

        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

export default connectDB;
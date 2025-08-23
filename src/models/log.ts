import { LOG_Interface } from "@/types/modelTypes";
import { Schema, model, models } from "mongoose";

/**
 * Schema definition for storing user activity logs in the database.
 * This schema represents a log document in the "Logs" collection.
 */
const LogSchema = new Schema<LOG_Interface>({
    title: {
        type: String,   
        required: true,
    },
    action: {
        type: String,  
        required: true,
    },
    user_id: {
        type: String,   
        required: true,
    },
    createdAt: {
        type: Date,    
        required: true,
    }
}, { collection: "Logs", timestamps: true });

/**
 * Creates a Mongoose model for the log document.
 * If the model already exists, it uses the existing model, otherwise it creates a new one.
 */
const Log = models?.Log || model("Log", LogSchema);

export default Log;
import { UserRole } from "@/types/enums/generalEnums";
import { User_Interface } from "@/types/modelTypes";
import { Schema, model, models } from "mongoose";

// Define User Schema
const UserSchema = new Schema<User_Interface>(
  {
    email: {
      type: String,
      required: true,
      unique: true,         // Ensures no duplicate emails
      trim: true,           // Removes whitespace
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    last_name: {
      type: String,
      default: "",
    },
    phone_number: {
      type: String,
      default: "",
    },
    profile_picture: {
      type: String,
      default: "",
    },
    liked_products: {
      type: [String],        // Array of product IDs
      default: [],
    },
    role: {
      type: String,
      enum: Object.values(UserRole), // Restrict values to defined roles
      required: true,
      default: UserRole.CLIENT,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    orders: {
      type: [String],        // Array of order IDs
      default: [],
    },
    addresses: [
      {
        estate: { type: String, required: true },
        city: { type: String, required: true },
        text_address: { type: String, required: true },
        postalCode: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    resetPassword: {
      token: {
        type: String,
        default: "",
      },
      expires: {
        type: Date,          // should be Date, not String
        default: null,
      },
    },
  },
  {
    collection: "User",
    timestamps: true,        // Auto-manages createdAt & updatedAt
  }
);

const User = models?.User || model("User", UserSchema);

export default User;
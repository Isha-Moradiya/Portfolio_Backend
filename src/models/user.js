import mongoose from "mongoose";
import { ROLE } from "../constants/databaseEnums.js";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, default: ROLE.ADMIN },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },

    // Reference to portfolio content
    portfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Portfolio'
    }

  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

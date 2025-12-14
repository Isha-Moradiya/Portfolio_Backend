import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['unread', 'read', 'replied', 'archived'], 
      default: 'unread' 
    },
    adminNotes: { type: String } // For internal notes
}, { timestamps: true });

export default mongoose.model("Contact", ContactSchema);

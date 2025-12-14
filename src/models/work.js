import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  workImages: [{ type: String }],
  techStack: [{ type: String }],
  codeUrl: { type: String },
  liveUrl: { type: String },
  featured: { type: Boolean, default: false },
  category: { type: String, default: "web" },
}, { timestamps: true });

export default mongoose.model("Work", WorkSchema);

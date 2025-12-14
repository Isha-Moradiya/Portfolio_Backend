import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { type: String, required: true },
    iconImage: { type: String },
    category: { type: String, default: "general" },
    proficiency: { type: Number, min: 1, max: 100, default: 50 },
    // displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Skill", SkillSchema);

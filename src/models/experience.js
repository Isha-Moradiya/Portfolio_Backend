import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    startYear: { type: Number, required: true },
    endYear: { type: Number },
    current: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Experience", ExperienceSchema);

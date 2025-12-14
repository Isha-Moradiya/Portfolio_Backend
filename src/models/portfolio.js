import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    responseTime: { type: String },
    githubUrl: { type: String },
    linkedinUrl: { type: String },
    twitterUrl: { type: String },

    // Hero Section
    heroTitle: { type: String },
    heroSubtitle: { type: String },
    heroDescription: { type: String },
    heroImage: { type: String },
    resumeLink: { type: String },

    // About Section
    aboutTitle: { type: String },
    aboutDescription: { type: String },
    strengths: [{ type: String }],
    aboutImage: { type: String },

    // References to other collections
    experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }],

}, { timestamps: true });

export default mongoose.model("Portfolio", PortfolioSchema);

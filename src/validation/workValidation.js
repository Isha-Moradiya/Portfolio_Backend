import Joi from "joi";

export const createWorkSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    techStack: Joi.array().items(Joi.string()).default([]),
    codeUrl: Joi.string().allow("", null),
    liveUrl: Joi.string().allow("", null),
    featured: Joi.boolean().default(false),
    category: Joi.string().default("web"),
    workImages: Joi.array().items(Joi.string()), 
});

export const updateWorkSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    techStack: Joi.array().items(Joi.string()),
    codeUrl: Joi.string().allow("", null),
    liveUrl: Joi.string().allow("", null),
    featured: Joi.boolean(),
    category: Joi.string(),
    workImages: Joi.array().items(Joi.string()), 
});

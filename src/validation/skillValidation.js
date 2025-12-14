import Joi from 'joi';

export const createSkillSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    iconImage: Joi.string().uri().optional().allow(''),
    category: Joi.string().valid("frontend", "backend", "database", "tools", "soft-skills", "general").default("general"),
    proficiency: Joi.number().min(1).max(100).default(50),
    displayOrder: Joi.number().default(0),
    isActive: Joi.boolean().default(true)
});

export const updateSkillSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    iconImage: Joi.string().uri().optional().allow(''),
    category: Joi.string().valid("frontend", "backend", "database", "tools", "soft-skills", "general").optional(),
    proficiency: Joi.number().min(1).max(100).optional(),
    displayOrder: Joi.number().optional(),
    isActive: Joi.boolean().optional()
});
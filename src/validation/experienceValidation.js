import Joi from "joi";

export const createExperienceSchema = Joi.object({
    role: Joi.string().required(),
    company: Joi.string().required(),
    description: Joi.string().required(),
    startYear: Joi.number().required(),
    endYear: Joi.number().allow(null, ""),
    current: Joi.boolean().default(false)
});

export const updateExperienceSchema = Joi.object({
    role: Joi.string(),
    company: Joi.string(),
    description: Joi.string(),
    startYear: Joi.number(),
    endYear: Joi.number().allow(null, ""),
    current: Joi.boolean()
});

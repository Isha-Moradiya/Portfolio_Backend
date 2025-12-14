import Joi from 'joi';

export const portfolioUpdateSchema = Joi.object({
    responseTime: Joi.string().max(50).optional().allow(''),
    githubUrl: Joi.string().uri().optional().allow(''),
    linkedinUrl: Joi.string().uri().optional().allow(''),
    twitterUrl: Joi.string().uri().optional().allow(''),

    // Hero fields
    heroTitle: Joi.string().max(100).optional().allow(''),
    heroSubtitle: Joi.string().max(200).optional().allow(''),
    heroDescription: Joi.string().max(1000).optional().allow(''),
    heroImage: Joi.string().uri().optional().allow(''),
    resumeLink: Joi.string().uri().optional().allow(''),

    // About fields
    aboutTitle: Joi.string().max(100).optional().allow(''),
    aboutDescription: Joi.string().max(2000).optional().allow(''),
    strengths: Joi.array().items(Joi.string().max(50)).optional(),
    aboutImage: Joi.string().uri().optional().allow(''),
}); 
import Joi from "joi";

export const createContactSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().required(),
  subject: Joi.string().allow("", null),
  message: Joi.string().required(),
});

export const updateContactStatusSchema = Joi.object({
  status: Joi.string().valid("unread", "read", "replied", "archived").required(),
  adminNotes: Joi.string().allow("", null)
});

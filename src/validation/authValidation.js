import Joi from "joi";

export const loginSchema = Joi.object({
  name: Joi.string().allow("", null).optional().messages({
    "string.base": "User name should be string",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.empty": "Email cannot be empty",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .empty("")
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must include uppercase, lowercase, number, and special character",
      "string.empty": "Password is required",
      "any.required": "Password is required",
      "string.base": "Password must be a string",
    }),
});


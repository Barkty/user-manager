import Joi from "joi";
import BaseSchemaValidator from "../../middlewares/validator.js";

export default class AuthValidator extends BaseSchemaValidator {
    static async validateRegister(req, res, next) {
        const schema = Joi.object({
            levelOne: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            street: Joi.string(),
            location: Joi.string(),
            iban: Joi.string().length(12),
            password: Joi.string().min(8),
            supervisor: Joi.string(),
            isSuperCommissionApproved: Joi.boolean()
        });
    
        await BaseSchemaValidator.baseValidator(schema, req, res, next, 'body');
    }

    static async login(req, res, next) {
        const schema = Joi.object({
          email: Joi.string().email().label('Email').required(),
          password: Joi.string().trim().label('Password').required(),
        });
    
        await BaseSchemaValidator.baseValidator(schema, req, res, next, 'body');
    }
}
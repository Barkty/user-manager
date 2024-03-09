import Joi from "joi";
import BaseSchemaValidator from "../../middlewares/validator.js";

export default class AuthValidator extends BaseSchemaValidator {
    static async login(req, res, next) {
        const schema = Joi.object({
          email: Joi.string().email().label('Email').required(),
          password: Joi.string().trim().label('Password').required(),
        });
    
        await BaseSchemaValidator.baseValidator(schema, req, res, next, 'body');
    }
}
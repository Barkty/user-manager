import { createValidator } from "express-joi-validation";
import { error } from "../helpers/response.js";

export const validation = createValidator()

class BaseSchemaValidator {
    static async dynamicValidator(schema, req, type) {
        let data;
        switch (type) {
          case 'body':
            data = req.body = await schema.validateAsync(req.body);
            break;
          case 'query':
            data = req.query = await schema.validateAsync(req.query);
            break;
          default:
            data = req.params = await schema.validateAsync(req.params);
            break;
        }
        return data;
    }
    
    static async baseValidator(schema, req, res, next, type) {
        try {
          await this.dynamicValidator(schema, req, type);
          return next();
        } catch (err) {
          this.validationErrorManager(req, res, err);
        }
    }

    static validationErrorManager(req, res, err) {
        const message = err.message.replace(/["]/gi, '');
        return error(res, 400, {
          message,
          status: 400,
          err,
        });
      }
}

export default BaseSchemaValidator;
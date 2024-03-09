import Joi from 'joi';
import { expect } from 'chai';
import sinon from 'sinon';
import BaseSchemaValidator from '../../../src/middlewares/validator.js';

describe('BaseSchemaValidator', () => {
  describe('dynamicValidator', () => {
    it('should validate the body schema and return the data when type is "body"', async () => {
      const schema = Joi.object({
        firstName: Joi.string().required(),
        email: Joi.string().email().required(),
        age: Joi.number().integer().min(18).max(100)
          .required(),
      });
      const req = { body: { firstName: 'John', email: 'john@example.com', age: 25 } };
      const type = 'body';
      const expectedData = { firstName: 'John', email: 'john@example.com', age: 25 };

      const data = await BaseSchemaValidator.dynamicValidator(schema, req, type);

      expect(data).to.deep.equal(expectedData);
    });

    it('should validate the query schema and return the data when type is "query"', async () => {
      const schema = Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100)
          .default(10),
        sort: Joi.string().default('-createdAt'),
      });
      const req = { query: { page: 2, limit: 20, sort: 'name' } };
      const type = 'query';
      const expectedData = { page: 2, limit: 20, sort: 'name' };

      const data = await BaseSchemaValidator.dynamicValidator(schema, req, type);

      expect(data).to.deep.equal(expectedData);
    });

    it('should return validated params', async () => {
      const mockReq = {
        params: {
          id: '123',
        },
      };
      const mockSchema = Joi.object({
        id: Joi.number().integer().min(1).required(),
      });

      const result = await BaseSchemaValidator.dynamicValidator(mockSchema, mockReq, 'params');

      expect(result).to.deep.eq({ id: 123 });
    });
    it('should throw a validation error if params are invalid', async () => {
      const mockReq = {
        params: {
          id: 'abc',
        },
      };
      const mockSchema = Joi.object({
        id: Joi.number().integer().min(1).required(),
      });

      try {
        await BaseSchemaValidator.dynamicValidator(mockSchema, mockReq, 'params');
      } catch (err) {
        expect(err).to.be.an.instanceOf(Error);
        expect(err.details[0].message).to.eq('"id" must be a number');
      }
    });
  });

  describe('baseValidator', () => {
    it('should call next() when schema is valid', async () => {
      const mockSchema = {
        validateAsync: async (data) => data,
      };
      const mockReq = { body: {} };
      const mockRes = {};
      const mockNext = sinon.spy();

      await BaseSchemaValidator.baseValidator(mockSchema, mockReq, mockRes, mockNext, 'body');

      expect(mockNext.calledOnce).to.eq(true);
    });

    it('should call validationErrorManager() when schema is invalid', async () => {
      const mockSchema = {
        validateAsync: async () => {
          throw new Error('Invalid schema');
        },
      };
      const mockReq = { body: {} };
      const mockRes = {};
      const mockNext = sinon.spy();
      const mockValidationErrorManager = sinon.stub(BaseSchemaValidator, 'validationErrorManager');

      await BaseSchemaValidator.baseValidator(mockSchema, mockReq, mockRes, mockNext, 'body');

      expect(mockValidationErrorManager.calledOnceWithExactly(mockReq, mockRes, sinon.match.instanceOf(Error))).to.eq(true);

      mockValidationErrorManager.restore();
    });
  });
});

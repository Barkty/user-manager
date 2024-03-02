import sinon from 'sinon';
import chai from 'chai';
import { validateUsersAuthRequest } from '../../../../src/controllers/auth/request.js';
import authMiddleware from '../../../../src/middlewares/authMidlleware.js';

const { expect } = chai;

describe('WORKER AUTH MIDDLEWARE', () => {
    let next;
    let req;
    let res;
  
    beforeEach(() => {
      next = sinon.spy();
      res = {};
      req = {};
    });

    it ('should call validateUsersAuthRequest', async () => {
        await validateUsersAuthRequest(req, res, next)
        expect(next.called).to.equal(true);
    })
    
    it ('should call authMiddleware', async () => {
        await authMiddleware(req, res, next)
        expect(next.called).to.equal(true);
    })
})
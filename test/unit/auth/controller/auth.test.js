import sinon from 'sinon';
import { expect } from 'chai';
import { signIn, signOut } from '../../../../src/controllers/auth/index.js';

describe('WORKER AUTHCONTROLLER', () => {
    let next;
    let req;
    let res;
  
    beforeEach(() => {
      next = sinon.spy();
      res = {};
      req = {};
    });

    it ('should call signIn', async () => {
        await signIn(req, res, next)
        expect(next.called).to.equal(true);
    })
    
    it ('should call signOut', async () => {
        await signOut(req, res, next)
        expect(next.called).to.equal(true);
    })
})
import sinon from 'sinon';
import chai from 'chai';
import { signIn, signOut } from '../../../../src/controllers/auth.js';

const { expect } = chai;

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
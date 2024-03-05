import sinon from 'sinon';
import { expect } from 'chai';
import { calculateOtherLevelWorkers, checkIfWorkerWithEmailExists, checkIfWorkerWithIdExists } from '../../../../src/controllers/workers/request.js';

describe('WORKER MIDDLEWARE', () => {
    let next;
    let req;
    let res;
  
    beforeEach(() => {
      next = sinon.spy();
      res = {};
      req = {};
    });

    it ('should call checkIfWorkerWithEmailExists', async () => {
        await checkIfWorkerWithEmailExists(req, res, next)
        expect(next.called).to.equal(true);
    })
    
    it ('should call checkIfWorkerWithIdExists', async () => {
        await checkIfWorkerWithIdExists(req, res, next)
        expect(next.called).to.equal(true);
    })
    
    it ('should call calculateOtherLevelWorkers', async () => {
        await calculateOtherLevelWorkers(req, res, next)
        expect(next.called).to.equal(true);
    })
})
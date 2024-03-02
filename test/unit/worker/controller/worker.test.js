import sinon from 'sinon';
import chai from 'chai';
import { createWorker, fetchWorkers, updateWorker } from '../../../../src/controllers/workers/worker.js';

const { expect } = chai;

describe('WORKER CONTROLLER', () => {
    let next;
    let req;
    let res;
  
    beforeEach(() => {
      next = sinon.spy();
      res = {};
      req = {};
    });

    it ('should call createWorker', async () => {
        await createWorker(req, res, next)
        expect(next.called).to.equal(true);
    })
    
    it ('should call updateWorker', async () => {
        await updateWorker(req, res, next)
        expect(next.called).to.equal(true);
    })
    
    it ('should call fetchWorkers', async () => {
        await fetchWorkers(req, res, next)
        expect(next.called).to.equal(true);
    })
})
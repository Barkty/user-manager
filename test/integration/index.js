import { expect } from 'chai';
import request from 'supertest';
import server from '../../server.js';

describe('Integration test', () => {
    it('Hello World', (done) => {
      request(server)
        .get('/api')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Hello from homepage. Check the API specification for further guidance and next steps.');
          done();
        });
    });
  });
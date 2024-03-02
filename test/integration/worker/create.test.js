import { expect } from 'chai';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import server from "../../../server.js"

describe("WORKER CREATE", () => {
    it("should create worker", (done) => {
        request(server).post('/api/worker').set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .send({
          email: process.env.WORKER_EMAIL,
          password: process.env.WORKER_PASSWORD,
          firstName: process.env.WORKER_FIRSTNAME,
          lastName: process.env.WORKER_LASTNAME,
          levelOne: process.env.WORKER_LEVELONE,
          supervisor: process.env.WORKER_SUPERVISOR,
          isSuperCommissionApproved: process.env.WORKER_APPROVED,
          iban: faker.finance.accountNumber(12)
        }).end((err, res) => {
            process.env.WORKER_TOKEN = res.body.data.token;
            process.env.WORKER_ID = res.body.data._id;
            expect(res.body.message).to.equal("Successful");
            expect(res.body.code).to.equal(200);
            expect(res.body.data).to.have.property('token');
            done()
        })
    })
    
    it("should create worker", (done) => {
        request(server).post('/api/worker').set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .send({
          mail: process.env.WORKER_EMAIL,
          password: process.env.WORKER_PASSWORD,
          firstName: process.env.WORKER_FIRSTNAME,
          lastName: process.env.WORKER_LASTNAME,
          levelOne: process.env.WORKER_LEVELONE,
          supervisor: process.env.WORKER_SUPERVISOR,
          isSuperCommissionApproved: process.env.WORKER_APPROVED,
          iban: faker.finance.accountNumber(12)
        }).end((err, res) => {
            expect(res.body.message).to.equal("email is required");
            expect(res.body.code).to.equal(400);
            done()
        })
    })
})
import { expect } from 'chai';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import server from "../../../server.js"
import dotenv from 'dotenv';

dotenv.config()

describe("G27 CREATE", () => {
    it("should create worker", (done) => {
        request(server).post('/api/worker')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${process.env.WORKER_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .send({
          email: process.env.G27_EMAIL,
          password: process.env.G27_PASSWORD,
          firstName: process.env.G27_FIRSTNAME,
          lastName: process.env.G27_LASTNAME,
          levelOne: process.env.G27_LEVELONE,
          supervisor: process.env.G27_SUPERVISOR,
          isSuperCommissionApproved: process.env.G27_APPROVED,
          iban: faker.finance.accountNumber(12)
        }).end((err, res) => {
            console.log('CREATE:: ', res.body)
            process.env.WORKER_TOKEN = res.body.data.token;
            process.env.WORKER_ID = res.body.data._id;
            expect(res.body.message).to.equal("Successful");
            expect(res.body.code).to.equal(200);
            expect(res.body.data).to.have.property('token');
            done()
        })
    })
    
    it("should not create worker", (done) => {
        request(server).post('/api/worker')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${process.env.WORKER_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(400)
        .send({
          mail: process.env.G27_EMAIL,
          password: process.env.G27_PASSWORD,
          firstName: process.env.G27_FIRSTNAME,
          lastName: process.env.G27_LASTNAME,
          levelOne: process.env.G27_LEVELONE,
          supervisor: process.env.G27_SUPERVISOR,
          isSuperCommissionApproved: process.env.G27_APPROVED,
          iban: faker.finance.accountNumber(12)
        }).end((err, res) => {
            console.log('CREATE22:: ', res.body)
            expect(res.body.message).to.equal("Email is required");
            expect(res.body.code).to.equal(400);
            done()
        })
    })
})
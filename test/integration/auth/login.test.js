import { expect } from 'chai';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import server from "../../../server.js"

describe("WORKER LOGIN", () => {
    it("should log worker in", (done) => {
        request(server).post('/api/auth/signin')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .send({
          email: process.env.WORKER_EMAIL,
          password: process.env.WORKER_PASSWORD
        })
        .end((err, res) => {
            process.env.WORKER_TOKEN = res.body.data.token;
            process.env.WORKER_ID = res.body.data.user._id;
            expect(res.body.message).to.equal("Successful");
            expect(res.body.code).to.equal(200);
            expect(res.body.data).to.have.property('token');
            done()
        })
    })

    it("should not log worker in validation", (done) => {
        request(server).post('/api/auth/signin').set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .send({
          mail: process.env.WORKER_EMAIL,
          password: process.env.WORKER_PASSWORD
        }).end((err, res) => {
            expect(res.body.data.message).to.equal('Email is required');
            expect(res.body.data.status).to.equal(400);
            done()
        })
    })

    it("should not log worker in does not exist", (done) => {
        request(server).post('/api/auth/signin').set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .send({
          email: faker.internet.email(),
          password: process.env.WORKER_PASSWORD
        }).end((err, res) => {
            console.log('MEEE::: ', res.body)
            expect(res.body.message).to.equal("User does not exist");
            expect(res.body.code).to.equal(404);
            done()
        })
    })
    
    it("should not log worker in mail is invalid", (done) => {
        request(server).post('/api/auth/signin').set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .send({
          email: "maill@m.com",
          password: process.env.WORKER_PASSWORD
        }).end((err, res) => {
            expect(res.body.message).to.equal("Email is not valid");
            expect(res.body.code).to.equal(400);
            done()
        })
    })
})
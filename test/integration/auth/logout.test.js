import { expect } from 'chai';
import request from 'supertest';
import server from "../../../server.js"

describe("WORKER LOGOUT", () => {
    it("should log worker out", (done) => {
        request(server).post('/api/auth/signout').set('Accept', 'application/json')
        .set('Authorization', process.env.WORKER_TOKEN)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal("Successful");
            expect(res.body.code).to.equal(200);
            done()
        })
    })
})
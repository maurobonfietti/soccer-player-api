const request = require('supertest');
const app = require('../app');

describe('Integration Tests for the API', () => {
    describe('GET /', () => {
        it('should response 200', async () => {
            const res = await request(app).get(`/`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message');
        });
    });

    describe('GET /status', () => {
        it('should response 200', async () => {
            const res = await request(app).get(`/status`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'api', 'time');
        });
    });

    describe('GET /v1/players', () => {
        it('should response 200', async () => {
            const res = await request(app).get(`/v1/players`);
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('GET /v1/players/2', () => {
        it('should response 200', async () => {
            const res = await request(app).get(`/v1/players/2`);
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('GET /v1/players/1234567890', () => {
        it('should response 404', async () => {
            const res = await request(app).get(`/v1/players/1234567890`);
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('error', 'Player Not Found.');
        });
    });

    describe('GET /v1/players/dream-team', () => {
        it('should response 200', async () => {
            const res = await request(app).get(`/v1/players/dream-team`);
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('POST /v1/players', () => {
        it('with player data should response 201', async () => {
            const res = await request(app)
                    .post(`/v1/players`)
                    .send({
                        "playerId": "100",
                        "myposition": "goalkeeper",
                        "fullname": "Gianluigi Donnarumma"
                    });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('message', 'Player created.');
        });

        it('without player data should response 400', async () => {
            const res = await request(app).post(`/v1/players`).send({});
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error', 'Player info is incomplete.');
        });
    });

    describe('PATCH /v1/players/100', () => {
        it('with player data should response 200', async () => {
            const res = await request(app)
                    .patch(`/v1/players/100`)
                    .send({
                        "myposition": "forward",
                        "fullname": "Mauro Icardi"
                    });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Player updated.');
        });

        it('without player data should response 400', async () => {
            const res = await request(app).patch(`/v1/players/100`).send({});
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error', 'Player info is incomplete.');
        });
    });

    describe('DELETE /v1/players/100', () => {
        it('should response 204', async () => {
            const res = await request(app).delete(`/v1/players/100`);
            expect(res.statusCode).toEqual(204);
        });
    });
});

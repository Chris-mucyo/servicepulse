const request = require("supertest");
const app = require("../src/server");

describe("Health endpoint", () => {

    it("GET /health returns 200", async () => {
        const res = await request(app).get("/health");
        expect(res.status).toBe(200);
    });

    it("GET /health returns status 'ok' and numeric uptime", async () => {
        const res = await request(app).get("/health");
        expect(res.body.status).toBe("ok");
        expect(typeof res.body.uptime).toBe("number");
    });

});
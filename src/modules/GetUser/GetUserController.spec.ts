import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";

describe("Get User Controller", () => {

    let connections: any;
    let token: string;

    beforeAll(async () => {
        connections = await createConnection()
        await request(app)
            .post("/users")
            .send({
                name: "Test Integration Get User Controller",
                email: "testIntegrationGetUserControlle@test.com.br",
                password: "testIntegration",
            })
        const login = await request(app)
            .post("/users/login")
            .send({
                email: "testIntegrationGetUserControlle@test.com.br",
                password: "testIntegration",
            })
        token = login.body.token;
    });


    it("Itegration test: Should get user", async () => {
        const requestUser = await request(app)
            .get("/users")
            .set('Authorization', 'bearer ' + token)
        expect(requestUser.status).toEqual(200);
    })
    it("Itegration test: Should unauthorized", async () => {
        const requestUser = await request(app)
            .get("/users")
        expect(requestUser.status).toEqual(401);
    })
})
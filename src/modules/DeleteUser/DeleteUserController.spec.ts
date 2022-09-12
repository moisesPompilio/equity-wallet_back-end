import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import { createToken } from "../../auth";

describe("Delete User Controller", () => {

    let connections: any;
    let token: string;

    beforeAll(async () => {
        connections = await createConnection()
        await request(app)
            .post("/users")
            .send({
                name: "Test Integration Update User Controller",
                email: "testIntegrationUpdateUserControlle@test.com.br",
                password: "testIntegration",
            })
        const login = await request(app)
            .post("/users/login")
            .send({
                email: "testIntegrationUpdateUserControlle@test.com.br",
                password: "testIntegration",
            })
        token = login.body.token;
    });


    it("Itegration test: Should delete user", async () => {
        const requestUser = await request(app)
            .delete("/users")
            .set('Authorization', 'bearer ' + token)
        expect(requestUser.status).toEqual(200);
    })
    it("Itegration test: Should unauthorized", async () => {
        const requestUser = await request(app)
            .delete("/users")
        expect(requestUser.status).toEqual(401);
    })
    it("Itegration test: Should Invalid User", async () => {
        let tokenInvalid = (await createToken.execute("02594cd2-b7b6-494e-b0fc-b5be34eb0a7dInvalid")).token;
        const requestUser = await request(app)
            .delete("/users")
            .set('Authorization', 'bearer ' + tokenInvalid)
        expect(requestUser.status).toEqual(400);
    })
})
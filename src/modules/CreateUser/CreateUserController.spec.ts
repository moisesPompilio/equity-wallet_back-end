import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";

describe("Create user Controller", () => {

    let connections: any;

    beforeAll(async () => {
        connections = await createConnection()
    });


    it("Itegration test: Should be able to create new user", async () => {
        const response = await request(app)
            .post("/users")
            .send({
                name: "Test Integration create new user",
                email: "testIntegrationCreateNewUser@test.com.br",
                password: "testIntegration",
            })
        expect(response.status).toEqual(201);
    })
    it("Itegration test: Should be able to create an existing user", async () => {
        const createUser = await request(app)
            .post("/users")
            .send({
                name: "Test Integration Exiting new user",
                email: "testIntegrationExitingNewUser@test.com.br",
                password: "testIntegration",
            })
        expect(createUser.status).toEqual(201);
        const exitingUser = await request(app)
            .post("/users")
            .send({
                name: "Test Integration Exiting new user",
                email: "testIntegrationExitingNewUser@test.com.br",
                password: "testIntegration",
            })
        expect(exitingUser.status).toEqual(400);
    })
})
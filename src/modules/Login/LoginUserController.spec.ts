import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";

describe("Login user Controller", () => {

    let connections: any;

    beforeAll(async () => {
        connections = await createConnection()
    });


    it("Itegration test: Should be Login user", async () => {
        const insertUser = await request(app)
            .post("/users")
            .send({
                name: "Test Integration Login User",
                email: "testIntegrationLoginUser@test.com.br",
                password: "testIntegration",
            })
        expect(insertUser.status).toEqual(201);
        const login = await request(app)
            .post("/users/login")
            .send({
                name: "Test Integration create new user",
                email: "testIntegrationLoginUser@test.com.br",
                password: "testIntegration",
            })
        expect(login.status).toEqual(200);
    })
    it("Itegration test: Should not user is exist", async () => {
        const exitingUser = await request(app)
            .post("/users/login")
            .send({
                name: "Test Integration Not is Exist User",
                email: "testIntegrationNotIsExistUser@test.com.br",
                password: "testIntegration",
            })
        expect(exitingUser.status).toEqual(400);
    })
    it("Itegration test: Should Invalid Password", async () => {
        const createUser = await request(app)
            .post("/users")
            .send({
                name: "Test Integration Invalid Password",
                email: "testIntegrationInvalidPassword@test.com.br",
                password: "testIntegration",
            })
        expect(createUser.status).toEqual(201);
        const exitingUser = await request(app)
            .post("/users/login")
            .send({
                email: "testIntegrationInvalidPassword@test.com.br",
                password: "password",
            })
        expect(exitingUser.status).toEqual(400);
    })
})
import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import { createToken } from "../../auth";

describe("Get Category Controller", () => {

    let connections: any;
    let token: string;
    let categoryData = {
        title: "Get Category",
        expense: true
    }
    let id: String;
    beforeAll(async () => {
        connections = await createConnection()
        await request(app)
            .post("/users")
            .send({
                name: "Test Integration Get Category Controller",
                email: "testIntegrationGetCategoryControlle@test.com.br",
                password: "testIntegration",
            })
        const login = await request(app)
            .post("/users/login")
            .send({
                email: "testIntegrationGetCategoryControlle@test.com.br",
                password: "testIntegration",
            })
        token = login.body.token;
        const requestCategory = await request(app)
            .post("/category")
            .set('Authorization', 'bearer ' + token)
            .send(categoryData);
        id = requestCategory.body.id;

    });
    it("Itegration test: Should be able to delete The category", async () => {
        const requestCategory = await request(app)
            .get("/category")
            .set('Authorization', 'bearer ' + token);
        expect(requestCategory.status).toEqual(200);
        expect(requestCategory.body[0]).toHaveProperty('id');
    })
    it("Itegration test: Should Invalid User", async () => {
        let tokenInvalid = (await createToken.execute("02594cd2-b7b6-494e-b0fc-b5be34eb0a7dInvalid")).token;
        const requestCategory = await request(app)
            .get("/category")
            .set('Authorization', 'bearer ' + tokenInvalid)

        expect(requestCategory.status).toEqual(400);
    })
    it("Itegration test: Should unauthorized", async () => {
        const requestCategory = await request(app)
            .get("/category")
        expect(requestCategory.status).toEqual(401);
    })
})
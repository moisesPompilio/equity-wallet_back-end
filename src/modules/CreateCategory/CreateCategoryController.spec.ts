import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import { createToken } from "../../auth";

describe("Create Category Controller", () => {

    let connections: any;
    let token: string;
    let categoryData = {
        title: "Create Category",
        expense: true
    }
    let categoryExistingData = {
        title: "Create Category Existing",
        expense: true
    }
    beforeAll(async () => {
        
        connections = await createConnection()
        await request(app)
            .post("/users")
            .send({
                name: "Test Integration Create Category Controller",
                email: "testIntegrationCreateCategoryControlle@test.com.br",
                password: "testIntegration",
            })
        const login = await request(app)
            .post("/users/login")
            .send({
                email: "testIntegrationCreateCategoryControlle@test.com.br",
                password: "testIntegration",
            })
        token = login.body.token;
    });
    it("Itegration test: Should be able to create new category", async () => {
        const requestCategory = await request(app)
            .post("/category")
            .set('Authorization', 'bearer ' + token)
            .send(categoryData)
        expect(requestCategory.status).toEqual(201);
    })
    it("Itegration test: Should be able to create an existing category", async () => {
        await request(app)
            .post("/category")
            .set('Authorization', 'bearer ' + token)
            .send(categoryExistingData)
        const requestCategory = await request(app)
            .post("/category")
            .set('Authorization', 'bearer ' + token)
            .send(categoryExistingData)
        expect(requestCategory.status).toEqual(400);
    })
    it("Itegration test: Should unauthorized", async () => {
        const requestCategory = await request(app)
            .post("/category")
        expect(requestCategory.status).toEqual(401);
    })
    it("Itegration test: Should Invalid User", async () => {
        let tokenInvalid = (await createToken.execute("02594cd2-b7b6-494e-b0fc-b5be34eb0a7dInvalid")).token;
        const requestCategory = await request(app)
            .post("/category")
            .set('Authorization', 'bearer ' + tokenInvalid)
            .send(categoryData)
        expect(requestCategory.status).toEqual(400);
    })
})
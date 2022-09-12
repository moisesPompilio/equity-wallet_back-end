import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import { createToken } from "../../auth";

describe("Update Category Controller", () => {

    let connections: any;
    let token: string;
    let categoryData = {
        title: "Update Category",
        expense: true
    }
    let categoryFailedData = {
        title: "Update Category Failed",
        expense: true
    }
    let categoryDuplicatedData = {
        title: "Update Category Duplicate",
        expense: true
    }
    let UpdatecategoryData = {
        title: "Update Category Sucess",
        expense: true
    }
    let id: String;
    let idFailde: String;
    beforeAll(async () => {
        connections = await createConnection()
        await request(app)
            .post("/users")
            .send({
                name: "Test Integration Update Category Controller",
                email: "testIntegrationUpdateCategoryControlle@test.com.br",
                password: "testIntegration",
            })
        const login = await request(app)
            .post("/users/login")
            .send({
                email: "testIntegrationUpdateCategoryControlle@test.com.br",
                password: "testIntegration",
            })
        token = login.body.token;
        const requestCategory = await request(app)
            .post("/category")
            .set('Authorization', 'bearer ' + token)
            .send(categoryData);
        id = requestCategory.body.id;
        const requestCategoryFailde = await request(app)
            .post("/category")
            .set('Authorization', 'bearer ' + token)
            .send(categoryFailedData);
        idFailde = requestCategoryFailde.body.id;
        await request(app)
            .post("/category")
            .set('Authorization', 'bearer ' + token)
            .send(categoryDuplicatedData)


    });
    it("Itegration test: Should be able to Update The category", async () => {
        const requestCategory = await request(app)
            .put("/category/" + id)
            .set('Authorization', 'bearer ' + token)
            .send({UpdatecategoryData});
        expect(requestCategory.status).toEqual(200);
    })
    it("Itegration test: Update error, Duplicate Category", async () => {
        const requestCategory = await request(app)
            .put("/category/" + idFailde)
            .set('Authorization', 'bearer ' + token)
            .send(categoryDuplicatedData);
        expect(requestCategory.status).toEqual(400);
    })
    it("Itegration test: Update error, category does not exist", async () => {
        const requestCategory = await request(app)
            .put("/category/" + idFailde + "test")
            .set('Authorization', 'bearer ' + token)
            .send(categoryDuplicatedData);
        expect(requestCategory.status).toEqual(400);
    })
    it("Itegration test: Should unauthorized", async () => {
        const requestCategory = await request(app)
            .put("/category/" + idFailde)
        expect(requestCategory.status).toEqual(401);
    })
})
import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import { createToken } from "../../auth";

describe("Delete Category Controller", () => {

    let connections: any;
    let token: string;
    let categoryData = {
        title: "Delete Category",
        expense: true
    }
    let categoryFailedData = {
        title: "Delete Category Failed",
        expense: true
    }
    let id: String;
    let idFailde: String;
    beforeAll(async () => {
        connections = await createConnection()
        await request(app)
            .post("/users")
            .send({
                name: "Test Integration Delete Category Controller",
                email: "testIntegrationDeleteCategoryControlle@test.com.br",
                password: "testIntegration",
            })
        const login = await request(app)
            .post("/users/login")
            .send({
                email: "testIntegrationDeleteCategoryControlle@test.com.br",
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
            .send(categoryFailedData)
        idFailde = requestCategoryFailde.body.id;

    });
    it("Itegration test: Should be able to delete The category", async () => {
        const requestCategory = await request(app)
            .delete("/category/" + id)
            .set('Authorization', 'bearer ' + token);
        expect(requestCategory.status).toEqual(200);
    })
    it("Itegration test: Delete error, category does not existt", async () => {
        await request(app)
            .delete("/category/" + idFailde)
            .set('Authorization', 'bearer ' + token);
        const requestCategory = await request(app)
            .delete("/category/" + idFailde)
            .set('Authorization', 'bearer ' + token);
        expect(requestCategory.status).toEqual(400);
    })
    it("Itegration test: Should unauthorized", async () => {
        const requestCategory = await request(app)
            .delete("/category/" + idFailde)
        expect(requestCategory.status).toEqual(401);
    })
})
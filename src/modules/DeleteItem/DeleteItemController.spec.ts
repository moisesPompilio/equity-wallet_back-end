import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import { createToken } from "../../auth";
import { ICreateItemRequestDTO } from "../CreateItem/CreateItemDTO";

describe("Delete Item Controller", () => {

    let connections: any;
    let token: string;
    let ItemData: ICreateItemRequestDTO;
    let categoryData = {
        title: "Delete Item",
        expense: true
    }
    let id: string;
    let idFailed: string;
    beforeAll(async () => {
        connections = await createConnection()
        await request(app)
            .post("/users")
            .send({
                name: "Test Integration Delete Item Controller",
                email: "testIntegrationDeleteItemControlle@test.com.br",
                password: "testIntegration",
            })
        const login = await request(app)
            .post("/users/login")
            .send({
                email: "testIntegrationDeleteItemControlle@test.com.br",
                password: "testIntegration",
            })
        token = login.body.token;
        const Category = await request(app)
            .post("/category")
            .set('Authorization', 'bearer ' + token)
            .send(categoryData)
        ItemData = {
            idCategory: Category.body.id,
            title: "Create Item",
            value: 33.3,
            date: new Date("2022-09-01"),
            idUser: null,
        }
        const requestItem = await request(app)
            .post("/item")
            .set('Authorization', 'bearer ' + token)
            .send(ItemData)
        id = requestItem.body.id;
        const requestItemFailed = await request(app)
            .post("/item")
            .set('Authorization', 'bearer ' + token)
            .send(ItemData)
        idFailed = requestItemFailed.body.id;
    });
    it("Itegration test: Should be able to Delete Item", async () => {
        const requestItem = await request(app)
            .delete("/item/" + id)
            .set('Authorization', 'bearer ' + token)
        expect(requestItem.status).toEqual(200);
    })
    it("Itegration test: Error Delete Item", async () => {
        await request(app)
            .delete("/item/" + idFailed)
            .set('Authorization', 'bearer ' + token)
        const requestItem = await request(app)
            .delete("/item/" + idFailed)
            .set('Authorization', 'bearer ' + token)
        expect(requestItem.status).toEqual(400);
    })
    it("Itegration test: Should unauthorized", async () => {
        const requestItem = await request(app)
            .delete("/item/" + id)
        expect(requestItem.status).toEqual(401);
    })
})
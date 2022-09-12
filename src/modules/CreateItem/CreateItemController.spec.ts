import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import { createToken } from "../../auth";
import { ICreateItemRequestDTO } from "./CreateItemDTO";

describe("Create Item Controller", () => {

    let connections: any;
    let token: string;
    let ItemData: ICreateItemRequestDTO;
    let categoryData = {
        title: "Create Item",
        expense: true
    }
    beforeAll(async () => {
        connections = await createConnection()
        await request(app)
            .post("/users")
            .send({
                name: "Test Integration Create Item Controller",
                email: "testIntegrationCreateItemControlle@test.com.br",
                password: "testIntegration",
            })
        const login = await request(app)
            .post("/users/login")
            .send({
                email: "testIntegrationCreateItemControlle@test.com.br",
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
    });
    it("Itegration test: Should be able to create new Item", async () => {
        const requestItem = await request(app)
            .post("/item")
            .set('Authorization', 'bearer ' + token)
            .send(ItemData)
        expect(requestItem.status).toEqual(201);
    })
    it("Itegration test: Should unauthorized", async () => {
        const requestItem = await request(app)
            .post("/item")
        expect(requestItem.status).toEqual(401);
    })
    it("Itegration test: Should Invalid User", async () => {
        let tokenInvalid = (await createToken.execute("02594cd2-b7b6-494e-b0fc-b5be34eb0a7dInvalid")).token;
        const requestItem = await request(app)
            .post("/item")
            .set('Authorization', 'bearer ' + tokenInvalid)
            .send(ItemData)
        expect(requestItem.status).toEqual(400);
    })
})
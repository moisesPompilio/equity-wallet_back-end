import request from "supertest";
import { app } from "../../app";

describe("Create user Controller", () => {



    it("Should be able to create new user", async () => {
        const response = await request(app)
            .post("/users")
            .send({
                name: "Test Integration",
                email: "test-integration@test.com.br",
                password: "testIntegration",
            })
            console.log(response.status);
            //oks
    })
})
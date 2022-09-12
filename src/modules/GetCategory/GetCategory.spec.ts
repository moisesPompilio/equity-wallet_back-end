import { createConnection } from "typeorm";
import { User } from "../../entities/User";
import { createUserUseCase } from "../CreateUser";
import { createCategoryUseCase } from '../CreateCategory';
import { getCategory } from './index';


describe("Get Category", () => {
    let connections: any;
    const userData = new User({
        name: "Get Category",
        email: "GetCategory@test.com.br",
        password: "GetCategory",
    });
    let idUser: any;
    let idUserFailed: any;
    let categoryData: any;
    beforeAll(async () => {
        connections = await createConnection()

        const user = await createUserUseCase.execute(userData);
        idUser = user.id;
        idUserFailed = user.id + "test";
        categoryData = {
            idUser,
            title: "Get Category",
            expense: true
        }
    });
    it("Should Get The Category", async () => {
        const category = await createCategoryUseCase.execute(categoryData);
        expect(category).toHaveProperty("id");
        expect(category.expense).toEqual(categoryData.expense);
        expect(category.title).toEqual(categoryData.title);
        expect(category.idUser).toEqual(categoryData.idUser);
        const getCategoryResult = await getCategory.execute(idUser)
        expect(getCategoryResult[0]).toHaveProperty("id");
        expect(getCategoryResult[0].expense).toEqual(categoryData.expense);
        expect(getCategoryResult[0].title).toEqual(categoryData.title);
    });
    it("Get error, IdUser does not existt", async () => {
        await expect(getCategory.execute(idUserFailed)).rejects.toEqual(new Error("Error Get Category!"));
    });

});
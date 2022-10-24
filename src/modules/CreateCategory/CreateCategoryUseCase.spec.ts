import { createConnection } from "typeorm";
import { User } from "../../entities/User";
import { createUserUseCase } from "../CreateUser";
import { createCategoryUseCase } from './index';


describe("Create Category", () => {
    let connections: any;
    const userData = new User({
        name: "Create Category",
        email: "CreateCategory@test.com.br",
        password: "CreateCategory",
    });
    let idUser: string;
    let categoryData: any;
    let categoryExisting: any;
    beforeAll(async () => {

        connections = await createConnection()

        const user = await createUserUseCase.execute(userData);
        idUser = user.id;
        categoryData = {
            idUser,
            title: "Create Category",
            expense: true
        }
        categoryExisting = {
            idUser,
            title: "Create Category Existing",
            expense: true
        }
    });
    it("Should Create The Category", async () => {
        const category = await createCategoryUseCase.execute(categoryData);
        expect(category).toHaveProperty("id");
        expect(category.expense).toEqual(categoryData.expense);
        expect(category.title).toEqual(categoryData.title);
        expect(category.idUser).toEqual(categoryData.idUser);
    });
    it("Should not be able to create an existing Category", async () => {
        await createCategoryUseCase.execute(categoryExisting)
        await expect(createCategoryUseCase.execute(categoryExisting)).rejects.toEqual(new Error("Category already exits."));
    });
    it("Should Create Category failed", async () => {
        let categoryFailed = categoryData;
        categoryFailed.idUser = `${categoryFailed.idUser}test`;
        categoryFailed.title = `${categoryFailed.title} Failed`;

        await expect(createCategoryUseCase.execute(categoryFailed)).rejects.toEqual(new Error("Create Category failed!"));
    });

});
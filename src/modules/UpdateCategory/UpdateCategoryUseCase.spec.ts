import { createConnection } from "typeorm";
import { User } from "../../entities/User";
import { createUserUseCase } from "../CreateUser";
import { createCategoryUseCase } from '../CreateCategory';
import { updateCategoryUseCase } from './index';


describe("Update Category", () => {
    let connections: any;
    const userData = new User({
        name: "Update Category",
        email: "UpdateCategory@test.com.br",
        password: "UpdateCategory",
    });
    let idUser: string;
    let id: string;
    let idFailed: string;
    let categoryData: any;
    let categoryFailedData: any;
    let CategoryUpdate: any;
    let categoryDuplicate: any;
    beforeAll(async () => {
        connections = await createConnection()

        const user = await createUserUseCase.execute(userData);
        idUser = user.id;
        categoryData = {
            idUser,
            title: "Update Category",
            expense: true,
            id: "",
        }
        const category = await createCategoryUseCase.execute(categoryData);
        id = category.id;
        CategoryUpdate = {
            idUser,
            title: "Update Category success",
            expense: true,
            id
        }
        categoryFailedData = {
            idUser,
            title: "Update Category Failed",
            expense: true,
            id: "",
        }

        const categoryFailed = await createCategoryUseCase.execute(categoryFailedData);
        idFailed = categoryFailed.id + "test";
        categoryFailedData.id = idFailed;
        categoryDuplicate = {
            idUser,
            title: "Update Category Duplicate",
            expense: true,
            id: categoryFailed.id,
        }
    });
    it("Should Update The Category", async () => {
        const category = await updateCategoryUseCase.execute(CategoryUpdate);
        expect(category).toHaveProperty("id", id);
        expect(category.expense).toEqual(CategoryUpdate.expense);
        expect(category.title).toEqual(CategoryUpdate.title);

    });
    it("Update error, Duplicate title.", async () => {

        const category = await createCategoryUseCase.execute(categoryDuplicate);
        expect(category).toHaveProperty("id");
        await expect(updateCategoryUseCase.execute(categoryDuplicate)).rejects.toEqual(new Error("Duplicate title."));
    });
    it("Update error, category does not exist", async () => {
        await expect(updateCategoryUseCase.execute(categoryFailedData)).rejects.toEqual(new Error("Category does not exist."));
    });

});
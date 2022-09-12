import { createConnection } from "typeorm";
import { User } from "../../entities/User";
import { createUserUseCase } from "../CreateUser";
import { createCategoryUseCase } from '../CreateCategory';
import { deleteCategory } from './index';


describe("Delete Category", () => {
    let connections: any;
    const userData = new User({
        name: "Delete Category",
        email: "DeleteCategory@test.com.br",
        password: "DeleteCategory",
    });
    let idUser: string;
    let categoryData: any;
    let categoryFailedData: any;
    beforeAll(async () => {
        connections = await createConnection()

        const user = await createUserUseCase.execute(userData);
        idUser = user.id;
        categoryData = {
            idUser,
            title: "Delete Category",
            expense: true
        }
        categoryFailedData = {
            idUser,
            title: "Delete Category Failed",
            expense: true
        }
    });
    it("Should Delete The Category", async () => {
        const category = await createCategoryUseCase.execute(categoryData);
        expect(category).toHaveProperty("id");
        expect(category.expense).toEqual(categoryData.expense);
        expect(category.title).toEqual(categoryData.title);
        expect(category.idUser).toEqual(categoryData.idUser);
        const deleteCategoryResult = await deleteCategory.execute(category.id)
        expect(deleteCategoryResult).toHaveProperty("affected");
    });
    it("Delete error, category does not existt", async () => {
        const category = await createCategoryUseCase.execute(categoryFailedData);
        expect(category).toHaveProperty("id");
        await deleteCategory.execute(category.id)
        await expect(deleteCategory.execute(category.id)).rejects.toEqual(new Error("Category does not exist."));
    });

});
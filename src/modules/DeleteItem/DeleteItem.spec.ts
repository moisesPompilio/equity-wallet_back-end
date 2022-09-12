import { createConnection } from "typeorm";
import { verifyPassword } from "../../auth";
import { User } from "../../entities/User";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { createUserUseCase } from "../CreateUser";
import { createCategoryUseCase } from '../CreateCategory';
import { createItemUseCase } from "../CreateItem";
import { deleteItem } from './index';


describe("Delete Item", () => {
    let connections: any;
    const userData = new User({
        name: "Delete Item",
        email: "DeleteItem@test.com.br",
        password: "CreateItem",
    });
    let idUser: string;
    let categoryData: any;
    let itemData: any;
    let id: any;
    beforeAll(async () => {
        connections = await createConnection()

        const user = await createUserUseCase.execute(userData);
        idUser = user.id;
        categoryData = {
            idUser,
            title: "Delete Item",
            expense: true
        }

        const category = await createCategoryUseCase.execute(categoryData);
        itemData = {
            title: "Delete Item",
            value: 66.6,
            date: "2022-09-27",
            idUser,
            idCategory: category.id,
        }

        const item = await createItemUseCase.execute(itemData);
        id = item.id;
    });
    it("Should Delete The new Item", async () => {
        const item = await deleteItem.execute(id);
        await expect(item).toHaveProperty("affected", 1)
    });
    it("Should Delete Item failed", async () => {
        const item = await createItemUseCase.execute(itemData);
        expect(item).toHaveProperty("id");
        let idFailed = item.id;
        await deleteItem.execute(idFailed);
        await expect(deleteItem.execute(idFailed)).rejects.toEqual(new Error("Item does not exist."));
    });

});
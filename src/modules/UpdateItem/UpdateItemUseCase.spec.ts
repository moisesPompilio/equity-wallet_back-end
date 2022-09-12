import { createConnection } from "typeorm";
import { verifyPassword } from "../../auth";
import { User } from "../../entities/User";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { createUserUseCase } from "../CreateUser";
import { createCategoryUseCase } from '../CreateCategory';
import { createItemUseCase } from "../CreateItem";
import { updateItemUseCase } from './index';
import { deleteItem } from "../DeleteItem";


describe("Update Item", () => {
    let connections: any;
    const userData = new User({
        name: "Update Item",
        email: "UpdateItem@test.com.br",
        password: "CreateItem",
    });
    let idUser: string;
    let categoryData: any;
    let itemData: any;
    let id: any;
    let UpdateItem: any;
    beforeAll(async () => {
        connections = await createConnection()

        const user = await createUserUseCase.execute(userData);
        idUser = user.id;
        categoryData = {
            idUser,
            title: "Update Item",
            expense: true
        }

        const category = await createCategoryUseCase.execute(categoryData);
        itemData = {
            title: "Update Item",
            value: 66.6,
            date: "2022-09-27",
            idUser,
            idCategory: category.id,
        }

        const item = await createItemUseCase.execute(itemData);
        id = item.id;
        UpdateItem = {
            id,
            title: "Update Item sucess",
            value: 66.6,
            date: "2022-09-27",
            idUser,
            idCategory: category.id,
        }
    });
    it("Should Update The Item", async () => {
        const item = await updateItemUseCase.execute(UpdateItem);
        expect(item).toHaveProperty("id", id);
        expect(item.value).toEqual(UpdateItem.value);
        expect(item.title).toEqual(UpdateItem.title);
    });
    it("Should Update Item failed", async () => {
        let updateItemFailed = UpdateItem;
        const item = await createItemUseCase.execute(itemData);
        expect(item).toHaveProperty("id");
        let idFailed = item.id;
        updateItemFailed.id = idFailed;
        await deleteItem.execute(idFailed);
        await expect(updateItemUseCase.execute(item)).rejects.toEqual(new Error("Item does not exist."));
    });

});
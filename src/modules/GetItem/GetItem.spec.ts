import { createConnection } from "typeorm";
import { User } from "../../entities/User";
import { createUserUseCase } from "../CreateUser";
import { createCategoryUseCase } from '../CreateCategory';
import { createItemUseCase } from "../CreateItem";
import { getItem } from './index';


describe("Get Item", () => {
    let connections: any;
    const userData = new User({
        name: "Get Item",
        email: "GetItem@test.com.br",
        password: "GetItem",
    });
    let idUser: string;
    let idUserFailed: string;
    let categoryData: any;
    let itemData: any;
    beforeAll(async () => {


        connections = await createConnection()

        const user = await createUserUseCase.execute(userData);
        idUser = user.id;
        idUserFailed = user.id + "test";
        categoryData = {
            idUser,
            title: "Get Item",
            expense: true
        }
        const category = await createCategoryUseCase.execute(categoryData);
        itemData = {
            title: "Get Item",
            value: 66.6,
            date: "2022-09-27",
            idUser,
            idCategory: category.id,
        }
    });
    it("Should Create The new Item", async () => {
        const item = await createItemUseCase.execute(itemData);
        expect(item).toHaveProperty("id");
        expect(item.value).toEqual(itemData.value);
        expect(item.title).toEqual(itemData.title);
        const getItemResult = await getItem.execute(idUser);
        expect(getItemResult[0]).toHaveProperty("id");
        expect(getItemResult[0].value).toEqual(itemData.value);
        expect(getItemResult[0].title).toEqual(itemData.title);
    });
    it("Should Create Item failed", async () => {
        await expect(getItem.execute(idUserFailed)).rejects.toEqual(new Error("Erro Get Item!"));
    });

});
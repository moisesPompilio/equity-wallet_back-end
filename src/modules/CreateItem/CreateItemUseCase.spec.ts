import { createConnection } from "typeorm";
import { User } from "../../entities/User";
import { createUserUseCase } from "../CreateUser";
import { createCategoryUseCase } from '../CreateCategory';
import { createItemUseCase } from './index';


describe("Create Item", () => {
    let connections: any;
    const userData = new User({
        name: "Create Item",
        email: "CreateItem@test.com.br",
        password: "CreateItem",
    });
    let idUser: string;
    let categoryData: any;
    let itemData: any;
    beforeAll(async () => {

        connections = await createConnection()

        const user = await createUserUseCase.execute(userData);
        idUser = user.id;
        categoryData = {
            idUser,
            title: "Create Item",
            expense: true
        }
        const category = await createCategoryUseCase.execute(categoryData);
        itemData = {
            title: "Create Item",
            value: "66.6",
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
    });
    it("Should Create Item failed", async () => {
        let item = itemData;
        item.idUser = `${item.idUser}test`;
        item.idCategory = `${item.idCategory}test`;

        await expect(createItemUseCase.execute(itemData)).rejects.toEqual(new Error("Create new item failed!"));
    });

});
import { createConnection } from "typeorm";
import { verifyPassword } from "../../auth";
import { User } from "../../entities/User";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCsse";

describe("Update user", () => {
    let postgresUsersRepository: PostgresUsersRepository;
    let createUserUseCase: CreateUserUseCase
    let connections: any;
    let updateUserUseCase: UpdateUserUseCase;
    const userData = new User({
        name: "Update User",
        email: "UpdateUser@test.com.br",
        password: "UpdateUser",
    });
    let idUser: string;
    beforeAll(async () => {
        postgresUsersRepository = new PostgresUsersRepository();

        updateUserUseCase = new UpdateUserUseCase(postgresUsersRepository);
        createUserUseCase = new CreateUserUseCase(
            postgresUsersRepository,
        )
        connections = await createConnection()

        const user = await createUserUseCase.execute(userData);
        idUser = user.id;
    });
    it("Should Update The User", async () => {
        const userUpdate = {
            name: "Test Update User",
            email: "testUpdateUser@test.com.br",
            password: "TestUpdateUser",
            id: idUser
        }
        const Update = updateUserUseCase.execute(userUpdate);
        expect((await Update).id).toEqual(idUser);
        expect((await Update).name).toEqual(userUpdate.name);
        expect((await Update).email).toEqual(userUpdate.email);
    });
    it("Should Update Invalid id", async () => {
        const userUpdate = {
            name: "Test Update User",
            email: "testUpdateUser@test.com.br",
            password: "TestUpdateUser",
            id: idUser + "test"
        }

        await expect(updateUserUseCase.execute(userUpdate)).rejects.toEqual(new Error("Invalid id!"));
    });
});
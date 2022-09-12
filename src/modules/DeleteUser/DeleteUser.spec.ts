import { createConnection } from "typeorm";
import { verifyPassword } from "../../auth";
import { User } from "../../entities/User";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { DeleteUser } from "./DeleteUser";

describe("Update user", () => {
    let postgresUsersRepository: PostgresUsersRepository;
    let createUserUseCase: CreateUserUseCase;
    let deleteUser: DeleteUser;
    let connections: any;
    const userData = new User({
        name: "Delete User",
        email: "DeleteUser@test.com.br",
        password: "DeleteUser",
    });
    let idUser: string;
    beforeAll(async () => {
        postgresUsersRepository = new PostgresUsersRepository();

        createUserUseCase = new CreateUserUseCase(
            postgresUsersRepository,
        )
        connections = await createConnection()

        deleteUser = new DeleteUser(postgresUsersRepository);

        const user = await createUserUseCase.execute(userData);
        idUser = user.id;
    });
    it("Should Delete The User", async () => {
        const result = await deleteUser.execute(idUser);
        expect(result).toHaveProperty("affected", 1);
    });
    it("Should Delete Failed", async () => {
        const idInvalid = idUser + "test";
        await expect(deleteUser.execute(idInvalid)).rejects.toEqual(new Error("Failed to delete!"));
    });
});
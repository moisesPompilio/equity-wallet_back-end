import { createConnection } from "typeorm";
import { User } from "../../entities/User";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create user", () => {
    let postgresUsersRepository: PostgresUsersRepository;
    let createUserUseCase: CreateUserUseCase
    let connections: any;

    beforeAll(async () => {
        postgresUsersRepository = new PostgresUsersRepository();

        createUserUseCase = new CreateUserUseCase(
            postgresUsersRepository,
        )
        connections = await createConnection()
    });
    it("Should be able to create a new user", async () => {
        const userData = new User({
            name: "Test Name",
            email: "test@test.com.br",
            password: "testusername",
        });
        const user = await createUserUseCase.execute(userData);
        expect(user).toHaveProperty("id");
    });
    it("Should not be able to create an existing user", async () => {
        const userData = new User({
            name: "Test existing Name",
            email: "testExisting@test.com.br",
            password: "testExistin",
        });
        await createUserUseCase.execute(userData);
        await expect(createUserUseCase.execute(userData)).rejects.toEqual(
            new Error("User already exits!")
        );
    });
});
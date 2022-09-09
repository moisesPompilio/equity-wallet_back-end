import { createConnection } from "typeorm";
import { User } from "../../entities/User";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { LoginUser } from "./LoginUser";

describe("Login user", () => {
    let postgresUsersRepository: PostgresUsersRepository;
    let createUserUseCase: CreateUserUseCase
    let connections: any;
    let loginUser: LoginUser;

    beforeAll(async () => {
        postgresUsersRepository = new PostgresUsersRepository();

        createUserUseCase = new CreateUserUseCase(
            postgresUsersRepository,
        )
        loginUser = new LoginUser(postgresUsersRepository);
        connections = await createConnection()
    });
    it("Should be Login user", async () => {
        const userData = new User({
            name: "Test Login User",
            email: "testLoginUser@test.com.br",
            password: "login",
        });
        const user = await createUserUseCase.execute(userData);
        userData.password = "login"
        await expect(user).toHaveProperty("id");
        const login = await loginUser.execute(userData);
        expect(login).toHaveProperty("token")

    });
    it("Should not user is exist", async () => {
        const userData = new User({
            name: "Test Not User is Exist",
            email: "testNotUserIsExist@test.com.br",
            password: "testExist",
        });
        await expect(loginUser.execute(userData)).rejects.toEqual(
            new Error("The User does not exist!")
        );
    });
    it("Should invalid password", async () => {
        const userData = new User({
            name: "Test Invalid Password",
            email: "testInvalidPassword@test.com.br",
            password: "InvalidPassword",
        });
        const user = await createUserUseCase.execute(userData);
        expect(user).toHaveProperty("id");
        userData.password = "password";
        await expect(loginUser.execute(userData)).rejects.toEqual(
            Error("Invalid password!")
        );
    });
});
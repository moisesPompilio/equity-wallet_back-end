import { createConnection } from "typeorm";
import { User } from "../../entities/User";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { GetUser } from "./GetUser";

describe("Get user", () => {
    let postgresUsersRepository: PostgresUsersRepository;
    let createUserUseCase: CreateUserUseCase
    let getUser: GetUser;
    let connections: any;
    const userData = new User({
        name: "Get User",
        email: "testGetUser@test.com.br",
        password: "GetUser",
    });
    let idUser: string;
    beforeAll(async () => {
        postgresUsersRepository = new PostgresUsersRepository();

        getUser = new GetUser(postgresUsersRepository);

        createUserUseCase = new CreateUserUseCase(
            postgresUsersRepository,
        )
        connections = await createConnection()

        const user = await createUserUseCase.execute(userData);
        idUser = user.id;
    });
    it("Should Return The User", async () => {
        expect((await getUser.execute(idUser))).toHaveProperty("id", idUser);

    });
});
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { GetUser } from "./GetUser";
import { GetUserController } from "./GetUserController";

const postgresUsersRepository = new PostgresUsersRepository();

export const getUser = new GetUser(postgresUsersRepository);

export const getUserController = new GetUserController(getUser);
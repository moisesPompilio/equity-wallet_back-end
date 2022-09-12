import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { DeleteUser } from "./DeleteUser";
import { DeleteUserController } from "./DeleteUserController";

const postgresUsersRepository = new PostgresUsersRepository();

export const deleteUser = new DeleteUser(postgresUsersRepository);

export const deleteUserController = new DeleteUserController(deleteUser);
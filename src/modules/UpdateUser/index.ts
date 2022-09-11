import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCsse";

const postgresUsersRepository = new PostgresUsersRepository();

const updateUserUseCase = new UpdateUserUseCase(postgresUsersRepository);

export const updateUserController = new UpdateUserController(updateUserUseCase);
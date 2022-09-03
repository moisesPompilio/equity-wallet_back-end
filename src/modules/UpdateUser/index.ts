import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { UpdateUserController } from "./UpadateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCsse";

const postgresUsersRepository = new PostgresUsersRepository();

const updateUserUseCase = new UpdateUserUseCase(postgresUsersRepository);

export const updateUserController = new UpdateUserController(updateUserUseCase);
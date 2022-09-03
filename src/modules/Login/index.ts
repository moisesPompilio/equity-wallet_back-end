import { LoginUser } from "./LoginUser";
import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository';
import { LoginUserController } from './LoginUserController';

const postgresUsersRepository = new PostgresUsersRepository();

const loginUser = new LoginUser(postgresUsersRepository);

export const loginUserController = new LoginUserController(loginUser);
import { DeleteResult } from "typeorm";
import { User } from "../entities/User";

export interface IUsersRepository {
    findByEmail(email: string): Promise<User>;
    save(user: User): Promise<User>;
    findById(id: string): Promise<User>;
    delete(id: string): Promise<DeleteResult>;
    repository();
}
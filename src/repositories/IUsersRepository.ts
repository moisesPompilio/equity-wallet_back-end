import { User } from "../entities/User";

export interface IUsersRepository {
    findByEmail(email: string): Promise<User>;
    save(user: User): Promise<void>;
    findById(id: string): Promise<User>;
    delete(id: string): Promise<void>;
    repository();
}
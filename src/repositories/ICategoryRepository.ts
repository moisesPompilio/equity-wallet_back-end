import { Category } from "../entities/Category";
import { User } from "../entities/User";

export interface ICategoryRepository {
    save(category: Category): Promise<Category>;
    findByTitleAndIdUser(title: string, idUser: User): Promise<Category>;
    findByIdUser(idUser: User): Promise<Category[]>;
    findById(id: string): Promise<Category>;
    delete(id: string): Promise<void>;
    repository(): any;
}
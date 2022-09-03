import { Item } from "../entities/Item";
import { User } from "../entities/User";

export interface IItemsRepository {
    save(item: Item): Promise<Item>;
    findByIdUser(idUser: User): Promise<Item[]>;
    findById(id: string): Promise<Item>;
    delete(id: string): Promise<void>;
    repository(): any;
}
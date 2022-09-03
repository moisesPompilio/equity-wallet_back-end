import { getRepository } from "typeorm";
import { Item } from "../../entities/Item";
import { User } from "../../entities/User";
import { IItemsRepository } from "../IItemsRepository";

export class PostgresItemsRepository implements IItemsRepository {
    async save(item: Item) {
        return this.repository().save(item);
    }
    async findById(id: string): Promise<Item> {
        const category = await this.repository().findOne({ id });
        return category;
    }
    async findByIdUser(idUser: User): Promise<Item[]> {
        const categories = await this.repository().find({ idUser })
        return categories;
    }
    async delete(id: string): Promise<void> {
        await this.repository().delete(id);
    }
    repository() {
        return getRepository(Item);
    }
}
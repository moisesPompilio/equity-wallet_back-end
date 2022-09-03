import { getRepository } from "typeorm";
import { Category } from "../../entities/Category";
import { User } from "../../entities/User";
import { ICategoryRepository } from "../ICategoryRepository";

export class PostgresCategoryRepository implements ICategoryRepository {
    async save(category: Category) {
        return this.repository().save(category);
    }
    async findById(id: string): Promise<Category> {
        const category = await this.repository().findOne({ id });
        return category;
    }
    async findByTitleAndIdUser(title: string, idUser: User) {
        const category = await this.repository().findOne({ title, idUser })
        return category;
    }
    async findByIdUser(idUser: User): Promise<Category[]> {
        const categories = await this.repository().find({ idUser })
        return categories;
    }
    async delete(id: string): Promise<void> {
        await this.repository().delete(id);
    }
    repository() {
        return getRepository(Category);
    }
}
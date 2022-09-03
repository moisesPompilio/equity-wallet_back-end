import { Category } from "../../entities/Category";
import { User } from "../../entities/User";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

export class GetCategory {
    constructor(
        private categoryRepository: ICategoryRepository,

    ) {
        this.categoryRepository = categoryRepository;
    }
    async execute(idUser: User): Promise<Category[]> {
        const catgories = await this.categoryRepository.findByIdUser(idUser);
        return catgories;
    }
}
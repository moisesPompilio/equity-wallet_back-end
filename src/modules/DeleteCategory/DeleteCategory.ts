import { DeleteResult } from "typeorm";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

export class DeleteCategory {
    constructor(
        private categoryRepository: ICategoryRepository,

    ) {
        this.categoryRepository = categoryRepository;
    }
    async execute(id: string): Promise<DeleteResult> {
        const categoryDB = await this.categoryRepository.findById(id);
        if (!categoryDB) {
            throw new Error("Category does not exist.");
        }


        return await this.categoryRepository.delete(id);
    }
}
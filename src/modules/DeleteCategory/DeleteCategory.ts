import { ICategoryRepository } from "../../repositories/ICategoryRepository";

export class DeleteCategory {
    constructor(
        private categoryRepository: ICategoryRepository,

    ) {
        this.categoryRepository = categoryRepository;
    }
    async execute(id: string) {
        const categoryDB = await this.categoryRepository.findById(id);
        if (!categoryDB) {
            throw new Error("Category does not exist.");
        }


        await this.categoryRepository.delete(id);
    }
}
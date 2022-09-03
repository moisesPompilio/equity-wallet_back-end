import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { IUpdateCategoryRequestDTO } from "./UpadateCategoryDTO";

export class UpdateCategoryUseCase {
    constructor(
        private categoryRepository: ICategoryRepository,

    ) {
        this.categoryRepository = categoryRepository;
    }
    async execute(data: IUpdateCategoryRequestDTO) {
        const categoryAlreadyExists = await this.categoryRepository.findByTitleAndIdUser(data.title, data.idUser);
        const categoryDB = await this.categoryRepository.findById(data.id);
        if (!categoryDB) {
            throw new Error("Category does not exist.");
        }
        if (categoryAlreadyExists && categoryAlreadyExists.id != categoryDB.id) {
            throw new Error("Duplicate title.");
        }

        categoryDB.title = data.title? data.title: categoryDB.title;
        categoryDB.expense = data.expense? data.expense: categoryDB.expense;

        await this.categoryRepository.save(categoryDB);
    }
}
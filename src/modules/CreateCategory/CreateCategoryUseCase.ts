import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { ICreateCategoryRequestDTO } from "./CreateCategoryDTO";

export class CreateCategoryUseCase {
    constructor(
        private categoryRepository: ICategoryRepository,

    ) {
        this.categoryRepository = categoryRepository;
    }
    async execute(data: ICreateCategoryRequestDTO) {
        try {
            var categoryAlreadyExists = await this.categoryRepository.findByTitleAndIdUser(data.title, data.idUser);
        } catch (error) {
            console.log(error.message);
            throw new Error("Create Category failed!")
        }
        if (categoryAlreadyExists) {
            throw new Error("Category already exits.");
        }
        const category = new Category(data);

        return await this.categoryRepository.save(category);

    }
}
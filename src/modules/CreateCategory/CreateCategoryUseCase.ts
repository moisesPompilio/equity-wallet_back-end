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
        const categoryAlreadyExists = await this.categoryRepository.findByTitleAndIdUser(data.title, data.idUser);


        if (categoryAlreadyExists) {
            throw new Error("Category already exits.");
        }
        const category = new Category(data);

        await this.categoryRepository.save(category);
    }
}
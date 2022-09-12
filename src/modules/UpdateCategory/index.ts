import { PostgresCategoryRepository } from "../../repositories/implementations/PostgresCategoryRepository";
import { UpdateCategoryController } from "./UpadateCategoryController";
import { UpdateCategoryUseCase } from "./UpadateCategoryUseCase";

const postgresCategoryRepository = new PostgresCategoryRepository();

export const updateCategoryUseCase = new UpdateCategoryUseCase(postgresCategoryRepository);

export const updateCategoryController = new UpdateCategoryController(updateCategoryUseCase);
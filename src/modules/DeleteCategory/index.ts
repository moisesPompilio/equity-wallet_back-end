import { PostgresCategoryRepository } from "../../repositories/implementations/PostgresCategoryRepository";
import { DeleteCategory } from "./DeleteCategory";
import { DeleteCategoryController } from "./DeleteCategoryContoller";

const postgresCategoryRepository = new PostgresCategoryRepository();

const deleteCategory = new DeleteCategory(postgresCategoryRepository);

export const deleteCategoryController = new DeleteCategoryController(deleteCategory);
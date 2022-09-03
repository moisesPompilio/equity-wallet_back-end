import { PostgresCategoryRepository } from "../../repositories/implementations/PostgresCategoryRepository";
import { GetCategory } from "./GetCategory";
import { GetCategoryController } from "./GetCategoryController";

const postgresCategoryRepository = new PostgresCategoryRepository();

const getCategory = new GetCategory(postgresCategoryRepository);

export const getCategoryController = new GetCategoryController(getCategory);
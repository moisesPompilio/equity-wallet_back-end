import { PostgresCategoryRepository } from '../../repositories/implementations/PostgresCategoryRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { CreateCategoryController } from './CreateCategoryController';

const postgresCategoryRepository = new PostgresCategoryRepository();

const createCategoryUseCase = new CreateCategoryUseCase(postgresCategoryRepository);

export const createCategoryController = new CreateCategoryController(createCategoryUseCase);
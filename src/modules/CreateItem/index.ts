import { PostgresItemsRepository } from "../../repositories/implementations/PostgresItemsRepository";
import { CreateItemController } from "./CreateItemController";
import { CreateItemUseCase } from "./CreateItemUseCase";

const postgresItemsRepository = new PostgresItemsRepository();

export const createItemUseCase = new CreateItemUseCase(postgresItemsRepository);

export const createItemController = new CreateItemController(createItemUseCase);
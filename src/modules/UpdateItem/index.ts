import { PostgresItemsRepository } from "../../repositories/implementations/PostgresItemsRepository";
import { UpdateItemController } from "./UpdateItemController";
import { UpdateItemUseCase } from "./UpdateItemUseCase";

const postgresItemRepository = new PostgresItemsRepository();

const updateItemUseCase = new UpdateItemUseCase(postgresItemRepository);

export const updateItemController = new UpdateItemController(updateItemUseCase);
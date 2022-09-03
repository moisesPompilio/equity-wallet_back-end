import { PostgresItemsRepository } from "../../repositories/implementations/PostgresItemsRepository";
import { DeleteItem } from "./DeleteItem";
import { DeleteItemController } from "./DeleteItemController";


const postgresItemRepository = new PostgresItemsRepository();

const deleteItem = new DeleteItem(postgresItemRepository);

export const deleteItemController = new DeleteItemController(deleteItem);
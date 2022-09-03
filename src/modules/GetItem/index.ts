import { PostgresItemsRepository } from "../../repositories/implementations/PostgresItemsRepository";
import { GetItem } from "./GetItem";
import { GetItemController } from "./GetItemController";

const postgresItemsRepository = new PostgresItemsRepository();

const getItem = new GetItem(postgresItemsRepository);

export const getItemController = new GetItemController(getItem);
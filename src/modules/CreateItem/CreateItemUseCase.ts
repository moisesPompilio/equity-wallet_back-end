import { Item } from "../../entities/Item";
import { IItemsRepository } from "../../repositories/IItemsRepository";
import { ICreateItemRequestDTO } from "./CreateItemDTO";

export class CreateItemUseCase {
    constructor(
        private itemRepository: IItemsRepository,

    ) {
        this.itemRepository = itemRepository;
    }
    async execute(data: ICreateItemRequestDTO): Promise<Item> {

        try {
            const item = new Item(data);

            return await this.itemRepository.save(item);   
        } catch (error) {
            console.log(error.message)
            throw new Error("Create new item failed!");
        }
    }
}
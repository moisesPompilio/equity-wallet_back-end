import { Item } from "../../entities/Item";
import { IItemsRepository } from "../../repositories/IItemsRepository";
import { ICreateItemRequestDTO } from "./CreateItemDTO";

export class CreateItemUseCase {
    constructor(
        private itemRepository: IItemsRepository,

    ) {
        this.itemRepository = itemRepository;
    }
    async execute(data: ICreateItemRequestDTO) {

        const item = new Item(data);

        await this.itemRepository.save(item);
    }
}
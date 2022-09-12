import { DeleteResult } from "typeorm";
import { IItemsRepository } from "../../repositories/IItemsRepository";

export class DeleteItem {
    constructor(
        private ItemsRepository: IItemsRepository,

    ) {
        this.ItemsRepository = ItemsRepository;
    }
    async execute(id: string): Promise<DeleteResult> {
        const itemDB = await this.ItemsRepository.findById(id);
        if (!itemDB) {
            throw new Error("Item does not exist.");
        }

        return await this.ItemsRepository.delete(id);
    }
}
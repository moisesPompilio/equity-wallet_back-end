import { IItemsRepository } from "../../repositories/IItemsRepository";

export class DeleteItem {
    constructor(
        private ItemsRepository: IItemsRepository,

    ) {
        this.ItemsRepository = ItemsRepository;
    }
    async execute(id: string) {
        const itemDB = await this.ItemsRepository.findById(id);
        if (!itemDB) {
            throw new Error("Item does not exist.");
        }

        await this.ItemsRepository.delete(id);
    }
}
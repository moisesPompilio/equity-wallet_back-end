import { Item } from "../../entities/Item";
import { IItemsRepository } from "../../repositories/IItemsRepository";
import { IUpdateItemRequestDTO } from "./UpdateItemDTO";

export class UpdateItemUseCase {
    constructor(
        private ItemsRepository: IItemsRepository,

    ) {
        this.ItemsRepository = ItemsRepository;
    }
    async execute(data: IUpdateItemRequestDTO): Promise<Item> {
        try {
            var itemDB = await this.ItemsRepository.findById(data.id);
            if (!itemDB) {
                throw new Error("Item does not exist.");
            }
        } catch (error) {
            throw new Error("Item does not exist.");
        }

        itemDB.title = data.title ? data.title : itemDB.title;
        itemDB.idCategory = data.idCategory ? data.idCategory : itemDB.idCategory;
        itemDB.value = data.value ? data.value : itemDB.value;
        itemDB.date = data.date ? data.date : itemDB.date;

        return await this.ItemsRepository.save(itemDB);
    }
}
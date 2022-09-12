import { Request } from "express";
import { idetificationUser } from "../../auth";
import { Item } from "../../entities/Item";
import { IItemsRepository } from "../../repositories/IItemsRepository";

export class GetItem {
    constructor(
        private itemsRepository: IItemsRepository,

    ) {
        this.itemsRepository = itemsRepository;
    }
    async execute(idUser: any): Promise<Item[]> {
        try {
            const items = await this.itemsRepository.findByIdUser(idUser);
            return items;
        } catch (error) {
            throw new Error("Erro Get Item!");
        }
    }
}
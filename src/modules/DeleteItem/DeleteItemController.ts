import { Request, Response } from "express";
import { DeleteItem } from "./DeleteItem";

export class DeleteItemController {
    constructor(
        private deleteItem: DeleteItem,
    ) { }
    async execute(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        try {
            await this.deleteItem.execute(id);
            return response.status(200).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
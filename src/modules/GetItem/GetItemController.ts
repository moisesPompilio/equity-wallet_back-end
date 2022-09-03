import { Request, Response } from "express";
import { idetificationUser } from "../../auth";
import { GetItem } from "./GetItem";

export class GetItemController {
    constructor(
        private getItem: GetItem,
    ) { }
    async execute(request: Request, response: Response): Promise<Response> {
        const idUser: any = await idetificationUser.execute(request);
        try {
            const result = await this.getItem.execute(idUser);
            return response.status(200).send(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
import { Request, Response } from "express";
import { idetificationUser } from "../../auth";
import { CreateItemUseCase } from "./CreateItemUseCase";

export class CreateItemController {
    constructor(
        private createItemUseCase: CreateItemUseCase,
    ) { }
    async execute(request: Request, response: Response): Promise<Response> {
        const { title, date, value, idCategory } = request.body;
        const idUser: any = await idetificationUser.execute(request);
        try {
            await this.createItemUseCase.execute(
                {
                    title,
                    date,
                    value,
                    idCategory,
                    idUser
                }
            );
            return response.status(201).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
import { Request, Response } from "express";
import { idetificationUser } from "../../auth";
import { UpdateItemUseCase } from "./UpdateItemUseCase";

export class UpdateItemController {
    constructor(
        private updateItemUseCase: UpdateItemUseCase,
    ) { }
    async execute(request: Request, response: Response): Promise<Response> {
        const { title, date, value, idCategory } = request.body;
        const { id } = request.params;
        const idUser: any = await idetificationUser.execute(request);
        try {
            await this.updateItemUseCase.execute(
                {
                    id,
                    title,
                    date,
                    value,
                    idCategory,
                    idUser,
                }
            );
            return response.status(200).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
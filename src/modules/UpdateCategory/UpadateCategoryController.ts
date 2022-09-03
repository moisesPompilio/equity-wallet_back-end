import { Request, Response } from "express";
import { idetificationUser } from "../../auth";
import { UpdateCategoryUseCase } from "./UpadateCategoryUseCase";

export class UpdateCategoryController {
    constructor(
        private updateCategoryUseCase: UpdateCategoryUseCase,
    ) { }
    async execute(request: Request, response: Response): Promise<Response> {
        const { title, expense } = request.body;
        const { id } = request.params;
        const idUser:any = await idetificationUser.execute(request);
        try {
            await this.updateCategoryUseCase.execute(
                {
                    id,
                    title,
                    expense,
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
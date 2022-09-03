import { Request, Response } from "express";
import { idetificationUser } from "../../auth";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
    constructor(
        private createCategoryUseCase: CreateCategoryUseCase,
    ) { }
    async execute(request: Request, response: Response): Promise<Response> {
        const { title, expense } = request.body;
        const idUser:any = await idetificationUser.execute(request);
        try {
            await this.createCategoryUseCase.execute(
                {
                    title,
                    expense,
                    idUser,
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
import { Request, Response } from "express";
import { idetificationUser } from "../../auth";
import { GetCategory } from "./GetCategory";

export class GetCategoryController {
    constructor(
        private getCategory: GetCategory,
    ) { }
    async execute(request: Request, response: Response): Promise<Response> {
        const idUser: any = await idetificationUser.execute(request);
        try {
            const result = await this.getCategory.execute(idUser);
            return response.status(200).send(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
import { Request, Response } from "express";
import { idetificationUser } from "../../auth";
import { DeleteCategory } from "./DeleteCategory";

export class DeleteCategoryController {
    constructor(
        private deleteCategory: DeleteCategory,
    ) { }
    async execute(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        try {
            await this.deleteCategory.execute(id);
            return response.status(200).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
import { Request, Response } from "express";
import { idetificationUser } from "../../auth";
import { DeleteUser } from "./DeleteUser";

export class DeleteUserController {
    constructor(
        private deleteUser: DeleteUser,
    ) { }
    async execute(request: Request, response: Response): Promise<Response> {
        const id: any = await idetificationUser.execute(request);
        try {
            await this.deleteUser.execute(id);
            return response.status(200).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
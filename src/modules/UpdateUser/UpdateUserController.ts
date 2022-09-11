import { Request, Response } from "express";
import { idetificationUser } from "../../auth";
import { UpdateUserUseCase } from "./UpdateUserUseCsse";

export class UpdateUserController {
    constructor(
        private updateUserUseCase: UpdateUserUseCase,
    ) { }
    async execute(request: Request, response: Response): Promise<Response> {
        const { name, password, email } = request.body;
        const id: any = await idetificationUser.execute(request);
        try {
            const result = await this.updateUserUseCase.execute(
                {
                    id,
                    name,
                    password,
                    email,
                }
            );
            return response.status(200).send(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
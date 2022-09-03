import { Request, Response } from "express";
import { LoginUser } from "./LoginUser";

export class LoginUserController {
    constructor(
        private loginUser: LoginUser,
    ) { }
    async execute(request: Request, response: Response): Promise<Response> {
        const {email, password } = request.body;
        try {
           const result = await this.loginUser.execute(
                {
                    email,
                    password,
                }
            );
            return response.status(200).send(result)
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
} 
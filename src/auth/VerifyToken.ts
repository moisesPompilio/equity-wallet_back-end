import { Response, Request, NextFunction } from 'express';
import jsonwebtoken from "jsonwebtoken";
export class VerifyToken {
    private SECRET: string = process.env.SECRET;

    async execute(request: Request, response: Response, next: NextFunction): Promise<Response | NextFunction> {
        this.SECRET = process.env.SECRET;

        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return response.status(401).send({ message: "Access denied" });
        }
        try {
            jsonwebtoken.verify(token, this.SECRET);
            next()
        } catch (error) {
            response.status(401).json({ message: "Invalid token" });
        }
    }
}   
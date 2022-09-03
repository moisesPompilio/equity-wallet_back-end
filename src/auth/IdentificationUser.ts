import { Response, Request, NextFunction } from 'express';
import jsonwebtoken from "jsonwebtoken";

type placeholderToken = {
    id: string,
    AUTHSERVE: string,
}

export class IdetificationUser {
    private SECRET: string;
    async execute(request: Request): Promise<string> {
        this.SECRET = process.env.SECRET;

        const authHeader = request.headers['authorization'];
        const placeholder = authHeader.split(' ')[1];
        const token:any = await jsonwebtoken.verify(placeholder, this.SECRET);
        return token.id;
    }
}
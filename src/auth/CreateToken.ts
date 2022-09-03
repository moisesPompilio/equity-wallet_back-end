import jsonwebtoken from "jsonwebtoken";
import { Token } from "../entities/Token";

export class CreateToken {
    private SECRET: string;
    private ISSUE: string;
    private AUTHSERVE: string;
    private REFRESH_SECRET: string;
    async execute(id: string): Promise<Token> {
        this.SECRET = process.env.SECRET;
        this.ISSUE = process.env.ISSUE;
        this.AUTHSERVE = process.env.AUTHSERVE;
        this.REFRESH_SECRET = process.env.REFRESH_SECRET;

        const refreshToken = jsonwebtoken.sign({ id, ISSUE: this.ISSUE, AUTHSERVE: this.AUTHSERVE }, this.REFRESH_SECRET, { expiresIn: '36000s' });
        const token = jsonwebtoken.sign({ id, AUTHSERVE: this.AUTHSERVE }, this.SECRET, { expiresIn: '18000s' });

        const tokenUser = new Token({ token, refreshToken });
        return tokenUser;
    }
}
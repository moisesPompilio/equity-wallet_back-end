import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { Token } from "../entities/Token";
import { CreateToken } from "./CreateToken";

export class RefreshToken {
    private ISSUE: string;
    private AUTHSERVE: string;
    private REFRESH_SECRET: string;

    async execute(request: Request, response: Response): Promise<Response> {
        this.ISSUE = process.env.ISSUE;
        this.AUTHSERVE = process.env.AUTHSERVE;
        this.REFRESH_SECRET = process.env.REFRESH_SECRET;

        const { refreshToken } = request.body;
        if (refreshToken == null) {
            return response.sendStatus(401);
        }
        try {
            jsonwebtoken.verify(refreshToken, this.REFRESH_SECRET, async (err, tokenRequest) => {
                if (err) {
                    return response.sendStatus(401);
                }
                if (this.ISSUE == tokenRequest.ISSUE && this.AUTHSERVE == tokenRequest.AUTHSERVE) {
                    let createToken = new CreateToken();
                    response.status(200).send((await createToken.execute(tokenRequest.id)));
                } else {
                    return response.status(401).send({ message: "Access denied" });
                }

            })
        }
        catch (error) {
            return response.status(401)
        }
    }
}
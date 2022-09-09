import { createToken, verifyPassword } from "../../auth";
import { Token } from "../../entities/Token";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ILoginRequestDTO } from "./LoginUserDTO";

export class LoginUser {
    private usersRepository: IUsersRepository;
    constructor(
        usersRepository: IUsersRepository,
    ) {
        this.usersRepository = usersRepository;
    }
    async execute(data: ILoginRequestDTO): Promise<Token> {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);


        if (!userAlreadyExists) {
            throw new Error("The User does not exist!");
        }

        if (await verifyPassword.execute(data.password, userAlreadyExists.password)) {
            return createToken.execute(userAlreadyExists.id);
        } else {
            throw new Error("Invalid password!");
        }
    }
}
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class GetUser {
    constructor(
        private usersRepository: IUsersRepository,

    ) {
        this.usersRepository = usersRepository;
    }
    async execute(idUser: string): Promise<User> {
        const user = await this.usersRepository.findById(idUser);
        user.password = "";
        return user;
    }
}
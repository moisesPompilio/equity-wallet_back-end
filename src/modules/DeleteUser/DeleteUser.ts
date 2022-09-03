import { IUsersRepository } from "../../repositories/IUsersRepository";

export class DeleteUser {
    constructor(
        private usersRepository: IUsersRepository,

    ) {
        this.usersRepository = usersRepository;
    }
    async execute(id: string) {
        await this.usersRepository.delete(id);
    }
}
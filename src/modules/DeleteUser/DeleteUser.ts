import { DeleteResult } from "typeorm";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class DeleteUser {
    constructor(
        private usersRepository: IUsersRepository,

    ) {
        this.usersRepository = usersRepository;
    }
    async execute(id: string): Promise<DeleteResult> {
        try {
            return await this.usersRepository.delete(id);   
        } catch (error) {
            throw new Error("Failed to delete!")
        }
    }
}
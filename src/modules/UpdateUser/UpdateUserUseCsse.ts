import { encryptPassword, verifyPassword } from "../../auth";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";

export class UpdateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,

    ) {
        this.usersRepository = usersRepository;
    }
    async execute(data: IUpdateUserRequestDTO) {
        const UserDB = await this.usersRepository.findById(data.id);

        UserDB.email = data.email ? data.email : UserDB.email;
        UserDB.password = await verifyPassword.execute(data.password, UserDB.password) ? await encryptPassword.execute(data.password) : UserDB.password;
        UserDB.name = data.name ? data.name : UserDB.name;

        await this.usersRepository.save(UserDB);
    }
}
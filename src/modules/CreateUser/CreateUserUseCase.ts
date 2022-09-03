import { encryptPassword } from '../../auth';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
export class CreateUserUseCase {
    private usersRepository: IUsersRepository;
    constructor(
        usersRepository: IUsersRepository,
    ) {
        this.usersRepository = usersRepository;
    }
    async execute(data: ICreateUserRequestDTO): Promise<any> {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);


        if (userAlreadyExists) {
            throw new Error("User already exits.");
        }
        data.password = await encryptPassword.execute(data.password);
        const user = new User(data);

        await this.usersRepository.save(user);
    }
}
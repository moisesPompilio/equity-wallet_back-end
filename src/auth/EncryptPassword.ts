import bcrypt from 'bcrypt';
export class EncryptPassword {
    async execute(password: string): Promise<string> {
        return bcrypt.hashSync(password.toString(), 12);
    }
}
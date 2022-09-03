import bcrypt from 'bcrypt';
export class VerifyPassword {
    async execute(passwordLogin: string, passwordDatabase: string): Promise<boolean> {
        return bcrypt.compareSync(passwordLogin.toString(), passwordDatabase)
    }
}
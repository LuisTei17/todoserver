import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export class AuthService {

    encryptPassword(password: string): string {
        return bcrypt.hashSync(password, saltRounds);
    }

    comparePassword(password: string, hash: string): string {
        return bcrypt.compareSync(password, hash);
    }
}
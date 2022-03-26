import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const saltRounds = 10;
const privateKey = process.env.privateKey;

export class AuthService {

    encryptPassword(password: string): string {
        return bcrypt.hashSync(password, saltRounds);
    }

    comparePassword(password: string, hash: string): string {
        return bcrypt.compareSync(password, hash);
    }

    async createToken(jwtInfo): Promise<string> {
        return jwt.sign(jwtInfo, privateKey, { expiresIn: '8h'});
    }

    verifyToken(token: string) {
        return jwt.verify(token, privateKey);
    }
}
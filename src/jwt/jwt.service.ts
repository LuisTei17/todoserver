import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const privateKey = process.env.privateKey;

export class JwtService {

    async createToken(jwtInfo): Promise<string> {
        return jwt.sign(jwtInfo, privateKey, { expiresIn: '8h'});
    }

    verifyToken(token: string) {
        return jwt.verify(token, privateKey);
    }
}
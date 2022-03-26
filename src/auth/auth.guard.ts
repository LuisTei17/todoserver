import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from 'src/user/schema/user.schema';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await retrieveUser(request, this.jwtService);
    if (user) {
        request.user = user;
        return true;
    }
    return false;
  }
}

function retrieveUser(request: any, jwtService: JwtService): Promise<User> {
    const token = request.headers.token;
    if (!token)
        throw new Error('Token not found');
    return jwtService.verifyToken(token);

}

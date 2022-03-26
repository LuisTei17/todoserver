import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/schema/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await retrieveUser(request, this.authService);
    if (user) {
        request.user = user;
        return true;
    }
    return false;
  }
}

function retrieveUser(request: any, authService: AuthService): Promise<User> {
    const token = request.headers.token;
    if (!token)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN);
    return authService.verifyToken(token);

}

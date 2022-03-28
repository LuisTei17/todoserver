import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/schema/user.schema';
import * as constants from '../helpers/constants.json';
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
    try {

      const token = request.headers.token;
      if (!token)
        throw new HttpException(constants.INVALID_USER, HttpStatus.FORBIDDEN);
      return authService.verifyToken(token);
    } catch (e) {
      throw new HttpException(constants.ERROR_TOKEN, HttpStatus.FORBIDDEN);
    }

}

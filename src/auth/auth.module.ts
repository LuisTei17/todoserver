import { Module } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Module({
  imports: [AuthService],
  controllers: [],
  providers: [JwtService, UserService]
})
export class UserModule {}

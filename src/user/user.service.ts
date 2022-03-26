import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument} from './schema/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtService } from 'src/jwt/jwt.service';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
    private jwtService: JwtService) {}

  saveUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  createPassword(createUserDto: CreateUserDto): CreateUserDto {
    const { password } = createUserDto;
    createUserDto.password = this.authService.encryptPassword(password);
    return createUserDto;
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto; 
    const user = await this.userModel.findOne({email});
    if (!user)
      throw new Error('User not found');

    const correctPassword = this.authService.comparePassword(password, user.password);
    if (!correctPassword)
      throw new Error('Invalid password');
    
    return user;
  }

  createToken(user: UserEntity): Promise<String> {
    const jwtInfo = {
      id: user._id,
      email: user.email,
      password: user.password
    };

    return this.jwtService.createToken(jwtInfo);
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.userModel.findById(id).exec();
    if (!foundUser)
      throw new Error('Invalid User');
    return foundUser;
  }

  async remove(id: string): Promise<User> {
    const foundUser = await this.userModel.findById(id).exec();
    if (!foundUser)
      throw new Error('Invalid User');
    return this.userModel.findByIdAndRemove(id).exec();
  }
}

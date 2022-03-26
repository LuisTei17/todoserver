import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument} from './schema/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService) {}

  saveUser(createUserDto: CreateUserDto): Promise<User> {
    const validEmail = this.validateEmail(createUserDto.email);

    if (!validEmail)
      throw new HttpException('Email Not found', HttpStatus.NOT_FOUND);
    
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  validateEmail(email) {
    const matchedEmail = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (matchedEmail && matchedEmail.length)
      return true;
    return false;
  };

  createPassword(createUserDto: CreateUserDto): CreateUserDto {
    const { password } = createUserDto;
    createUserDto.password = this.authService.encryptPassword(password);
    return createUserDto;
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto; 
    const user = await this.userModel.findOne({email});
    if (!user)
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);

    const correctPassword = this.authService.comparePassword(password, user.password);
    if (!correctPassword)
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
    
    return user;
  }

  createToken(user: UserEntity): Promise<String> {
    const jwtInfo = {
      id: user._id,
      email: user.email,
      password: user.password
    };

    return this.authService.createToken(jwtInfo);
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.userModel.findById(id).exec();
    if (!foundUser)
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    return foundUser;
  }

  async remove(id: string): Promise<User> {
    const foundUser = await this.userModel.findById(id).exec();
    if (!foundUser)
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    return this.userModel.findByIdAndRemove(id).exec();
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument} from './schema/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './entity/user.entity';
import * as constants from '../helpers/constants.json';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService) {}

  async saveUser(createUserDto: CreateUserDto): Promise<User> {
    const validEmail = this.validateEmail(createUserDto.email);

    if (!validEmail)
      throw new HttpException(constants.INVALID_EMAIL, HttpStatus.CONFLICT);

    const foundEmail = await this.userModel.findOne({email: createUserDto.email})
    
    if (foundEmail)
      throw new HttpException(constants.DUPLICATE_EMAIL, HttpStatus.CONFLICT);

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
      throw new HttpException(constants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    const correctPassword = this.authService.comparePassword(password, user.password);
    if (!correctPassword)
      throw new HttpException(constants.INVALID_PASSWORD, HttpStatus.CONFLICT);
    
    return user;
  }

  async createToken(user: UserEntity): Promise<Object> {
    const jwtInfo = {
      id: user._id,
      email: user.email,
      password: user.password
    };
    const token = await this.authService.createToken(jwtInfo);
    return { token };
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.userModel.findById(id).exec();
    if (!foundUser)
      throw new HttpException(constants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return foundUser;
  }

  async remove(id: string): Promise<User> {
    const foundUser = await this.userModel.findById(id).exec();
    if (!foundUser)
      throw new HttpException(constants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.userModel.findByIdAndRemove(id).exec();
  }
}

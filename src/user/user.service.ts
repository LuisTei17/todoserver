import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument} from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
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

import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(process.env.mongo_url), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthModule],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be a valid email ', () => {
    const email = 'adadadad@gmail.com';
    const validEmail = service.validateEmail(email);

    expect(validEmail).toBe(true)
  });

  it('should be an invalid email ', () => {
    const wrongEmail = 'aaaaccccca,ccc'
    const invalidEmail = service.validateEmail(wrongEmail);

    expect(invalidEmail).toBe(false)
  });

  afterAll(done => {
    mongoose.disconnect()
      .then(() => {
        done()
      });
  })
});

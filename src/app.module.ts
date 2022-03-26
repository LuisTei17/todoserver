import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), UserModule, ProjectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

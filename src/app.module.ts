import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [MongooseModule.forRoot(process.env.mongo_url), AuthModule, UserModule, ProjectModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

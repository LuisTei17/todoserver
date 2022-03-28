import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/task.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), ProjectModule, AuthModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}

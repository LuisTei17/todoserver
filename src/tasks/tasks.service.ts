import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async findByProjectId(id_project: string): Promise<Array<Task>> {
    const tasks = await this.taskModel.find({id_project}).exec();
    if (!tasks || !tasks.length)
      throw new HttpException('Project without tasks', HttpStatus.CONFLICT);

    return tasks;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto);

    if (!updatedTask)
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);


    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndRemove(id);

    if (!deletedTask)
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);

    return deletedTask;
  }
}

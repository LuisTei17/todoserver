import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schema/task.schema';
import { Model } from 'mongoose';
import { TaskEntity } from './entity/task.entity';
import * as constants from '../helpers/constants.json';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    createTaskDto.createDate = new Date();

    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async findByProjectId(id_project: string): Promise<Array<Task>> {
    const tasks = await this.taskModel.find({id_project}).exec();
    if (!tasks || !tasks.length)
      throw new HttpException(constants.PROJECT_WITHOUT_TASKS, HttpStatus.CONFLICT);

    return tasks;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    updateTaskDto.finishDate = null;
    if (updateTaskDto.finished)
      updateTaskDto.finishDate = new Date();

    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto);

    if (!updatedTask)
      throw new HttpException(constants.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);


    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndRemove(id);

    if (!deletedTask)
      throw new HttpException(constants.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);

    return deletedTask;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProjectService } from 'src/project/project.service';
import { TaskEntity } from './entity/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService, private projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task: TaskEntity = await this.tasksService.create(createTaskDto);
    await this.projectService.insertTask(createTaskDto.id_project, task._id);
    return task;
  }

  @Get(':id_project')
  @UseGuards(AuthGuard)
  findByProjectId(@Param('id_project') id_project: string) {
    return this.tasksService.findByProjectId(id_project);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}

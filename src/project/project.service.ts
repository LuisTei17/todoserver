import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schema/project.schema';
import * as constants from '../helpers/constants.json';
@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  create(createProjectDto: CreateProjectDto, idUser: string): Promise<Project> {
    const newProject = new this.projectModel({
      name: createProjectDto.name,
      id_user: idUser
    });
    return newProject.save();
  }

  async findByUserId(id_user: string): Promise<Array<Project>> {
    const projects = await this.projectModel.find({id_user}).populate('tasks').exec();

    return projects;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto);
    if (!updatedProject)
      throw new HttpException(constants.PROJECT_NOT_FOUND, HttpStatus.NOT_FOUND);

    return updatedProject;
  }

  async insertTask(id_project: string, id_task: string) {
    return this.projectModel.findByIdAndUpdate(id_project, {$push: {tasks: id_task}}).exec();
  }

  async remove(id: string): Promise<Project> {
    const deletedProject = await this.projectModel.findByIdAndRemove(id);

    if (!deletedProject)
      throw new HttpException(constants.PROJECT_NOT_FOUND, HttpStatus.NOT_FOUND);

    return deletedProject;
  }
}

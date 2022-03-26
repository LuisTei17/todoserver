import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schema/project.schema';

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
    const projects = await this.projectModel.find({id_user}).exec();
    if (!projects || !projects.length)
      throw new HttpException('Project without tasks', HttpStatus.CONFLICT);

    return projects;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto);

    if (!updatedProject)
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);

    return updatedProject;
  }

  async remove(id: string): Promise<Project> {
    const deletedProject = await this.projectModel.findByIdAndRemove(id);

    if (!deletedProject)
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);

    return deletedProject;
  }
}

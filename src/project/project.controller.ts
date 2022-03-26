import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/user/entity/user.entity';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() request, @Body() createProjectDto: CreateProjectDto) {
    console.log(request.user)
    const { id } = request.user;
    return this.projectService.create(createProjectDto, id);
  }

  @Get()
  @UseGuards(AuthGuard)
  findByUserId(@Req() request) {
    const { id } = request.user;
    return this.projectService.findByUserId(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}

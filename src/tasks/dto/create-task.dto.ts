import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    description: string;
  
    @ApiProperty()
    id_user: string;

    @ApiProperty()
    createDate: Date;

    @ApiProperty()
    finishDate: Date;

    @ApiProperty()
    id_project: string;


}

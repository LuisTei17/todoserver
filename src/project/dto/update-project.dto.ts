import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    finished: boolean;

}

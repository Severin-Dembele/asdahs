import { ApiProperty } from '@nestjs/swagger';

export class CreateConferenceDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  shortname: string;
}

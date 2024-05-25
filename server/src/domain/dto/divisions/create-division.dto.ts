import { ApiProperty } from '@nestjs/swagger';

export class CreateDivisionDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  shortname: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateUnionDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  shortname: string;
}

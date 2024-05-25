import { ApiProperty } from '@nestjs/swagger';

export class CreateActualiteDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  piece: string;
}

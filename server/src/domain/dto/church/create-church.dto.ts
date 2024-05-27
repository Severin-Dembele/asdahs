import { ApiProperty } from '@nestjs/swagger';

export class CreateChurchDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  typeChurch: string;
}

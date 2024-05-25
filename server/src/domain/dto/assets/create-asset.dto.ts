import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  item: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  value: string;
}

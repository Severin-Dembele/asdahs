import { ApiProperty } from '@nestjs/swagger';

export class MailListDto {
  name: string;
  @ApiProperty()
  email: string;
}

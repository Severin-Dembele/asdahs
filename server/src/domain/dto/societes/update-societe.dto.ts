import { PartialType } from '@nestjs/swagger';
import { CreateSocieteDto } from './create-societe.dto';

export class UpdateSocieteDto extends PartialType(CreateSocieteDto) {}

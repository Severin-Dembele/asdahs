import { PartialType } from '@nestjs/swagger';
import { CreateOptionDto } from './create-option.dto';

export class UpdateReponseProposeDto extends PartialType(CreateOptionDto) {}

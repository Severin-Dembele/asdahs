import { PartialType } from '@nestjs/swagger';
import { CreateSoussectionDto } from './create-soussection.dto';

export class UpdateSoussectionDto extends PartialType(CreateSoussectionDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateReponseReponduDto } from './create-reponse-repondu.dto';

export class UpdateReponseReponduDto extends PartialType(
  CreateReponseReponduDto,
) {}

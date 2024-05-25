import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeviDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsString()
  @IsNotEmpty()
  genre: string;
  @IsString()
  @IsNotEmpty()
  poste: string;
  @IsString()
  @IsNotEmpty()
  pays: string;
  @IsString()
  @IsNotEmpty()
  ville: string;
  @IsString()
  @IsNotEmpty()
  message: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  piece: string;

  @IsEmail()
  email: string;
  nombrePersonneAformer: number;
  @IsString()
  company;
}

import { Injectable } from '@nestjs/common';
import { CreateReponseReponduDto } from './dto/create-reponse-repondu.dto';
import { UpdateReponseReponduDto } from './dto/update-reponse-repondu.dto';
import { PrismaService } from '../repositories/prisma/prisma.service';
import { CreateOptionDto } from '../question/dto/option.dto';

@Injectable()
export class ReponseReponduService {
  constructor(private prisma: PrismaService) {}

  create(id: number, reponsePropose: CreateOptionDto) {
    return this.prisma.option.create({
      data: {
        title: reponsePropose.title,
        question: {
          connect: {
            id: id,
          },
        },
      },
    });
  }

  async createMultiple(
    idFormulaire: number,
    reponses: CreateReponseReponduDto[],
  ) {
    try {
      console.log(reponses);
      await this.prisma.reponseRepondu.createMany({
        data: reponses
      });
    }catch(e){
       console.log(e);
    }
   
  }

  findAll() {
    return this.prisma.reponseRepondu.findMany();
  }

  findOne(id: number) {
    return this.prisma.reponseRepondu.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateReponseReponduDto: UpdateReponseReponduDto) {
    return this.prisma.reponseRepondu.update({
      data: {
        title: updateReponseReponduDto.title,
      },
      where: { id: id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} reponseRepondu`;
  }
}

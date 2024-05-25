import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '../repositories/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  create(createQuestionDto: CreateQuestionDto){
    return "implemanted";
  }
  createQuestion(sectionId:number, createQuestionDto){
    return this.prisma.question.create({
      data:{
        title: createQuestionDto.title,
        type: createQuestionDto.type,
        section:{
          connect: {id: sectionId}
        }
      }
    })
  }
  createQuestionSousSection(sousSectionId: number, createQuestionDto: CreateQuestionDto){
    return this.prisma.question.create({
      data:{
        title: createQuestionDto.title,
        type: createQuestionDto.type,
        section:{
          connect: {id: sousSectionId}
        }
      }
    })
  }

  findQuestionSectionSousSection(sectionSousSectionId: number){
    return this.prisma.question.findMany({
      where:{
        AND:[
          {deleteAt: null},
          {sectionId: sectionSousSectionId}
        ]
      }
    })
  }

  createMultipleWithFormulaire(
    idFormulaire: number,
    createQuestionDtos: CreateQuestionDto[],
  ) {
   /* for (let i = 0; i < createQuestionDtos.length; i++) {
      const createQuestionDto = createQuestionDtos[i];
      this.prisma.question.create({
        data: {
          title: createQuestionDto.title,
          type: createQuestionDto.type,
          formulaire: {
            connect: { id: idFormulaire },
          },
        },
      });
    }*/
    return "implemanted";
  }

  async createWithFormulaire(
    idFormulaire: number,
    createQuestionDto: CreateQuestionDto,
  ) {
    /*return this.prisma.question.create({
      data: {
        title: createQuestionDto.title,
        type: createQuestionDto.type,
        formulaire: {
          connect: { id: idFormulaire },
        },
      },
    });*/
    return "implemented";
  }

  findAll() {
    return this.prisma.question.findMany();
  }

  findOne(id: number) {
    return this.prisma.question.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.prisma.question.update({
      data: {
        title: updateQuestionDto.title,
        type: updateQuestionDto.type,
      },
      where: { id: id },
    });
  }

  remove(id: number) {
    return this.prisma.question.update({
      data: {
        deleteAt: new Date(),
      },
      where: { id: id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../repositories/prisma/prisma.service';
import { CreateOptionDto } from '../question/dto/option.dto';

@Injectable()
export class OptionService {
  constructor(private prisma: PrismaService) {}

  /* createReponse(createReponse: CreateReponseproposeDto) {
    return this.prisma.reponsePropose.create({
      data: {
        title: createReponse.title,
      },
    });
  }*/
  create(reponsePropose: CreateOptionDto, id: number) {
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

  async createMultiple(idQuestion: number, reponseProposes: CreateOptionDto[]) {
    /*const dataCreated = await this.prisma.reponsePropose.createMany({
      data: reponseProposes,
    });
    //console.log(dataCreated);
    for (let i = 0; i < reponseProposes.length; i++) {
      const item = reponseProposes[i];
      console.log(item);
      await this.prisma.reponsePropose.create({
        data: {
          title: item.title,
          question: {
            connect: {
              id: idQuestion,
            },
          },
        },
      });
    }*/
    return 'implemanted';
  }

  update(id: number, reponsePropose) {
    return this.prisma.option.update({
      data: {
        title: reponsePropose.title,
      },
      where: { id: id },
    });
  }

  findOne(id: number) {
    return this.prisma.option.findUnique({
      where: { id: id },
    });
  }

  findAll() {
    return this.prisma.option.findMany();
  }

  findByQuestionId(idQuestion: number) {
    return this.prisma.option.findMany({
      where: { questionId: idQuestion },
    });
  }

  remove(id: number) {
    return this.prisma.option.update({
      data: {
        deleteAt: new Date(),
      },
      where: { id: id },
    });
  }
}

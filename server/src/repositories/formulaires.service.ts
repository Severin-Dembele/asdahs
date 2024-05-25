import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class FormulairesService {
  constructor(private prisma: PrismaService) {}

  create(createFormulaireDto) {
    return this.prisma.formulaire.create({
      data: {
        title: createFormulaireDto.title,
        description: createFormulaireDto.description,
      },
    });
  }

  findAll() {
    return this.prisma.formulaire.findMany();
  }

  findOne(id: number) {
    return this.prisma.formulaire.findFirst({
      where: { id: id },
      include:{
        section:{
          include:{
            sous_sections: {
              include:{
                question: {
                  include:{
                    option: true
                  }
                }
              }
            },
            question:{
              include:{
                option: true
              }
            },
          },
        }
      }
    });
  }

  update(id: number, updateFormulaire) {
    return this.prisma.formulaire.update({
      data: {
        title: updateFormulaire.title,
        description: updateFormulaire.description,
      },
      where: { id: id },
    });
  }

  valideFormulaire(idFormulaire: number, token: string) {
    return this.prisma.formulaire.update({
      data: {
        dateDebut: new Date(),
        dateFin: new Date(),
        token: token,
        isValid: true,
      },
      where: { id: idFormulaire },
    });
  }

  devaliderFormulaire(idFormulaire: number) {
    return this.prisma.formulaire.update({
      data: {
        isValid: false,
      },
      where: { id: idFormulaire },
    });
  }

  remove(id: number) {
    return this.prisma.formulaire.update({
      data: {
        deleteAt: new Date(),
      },
      where: { id: id },
    });
  }

  getQuestionsFromFile(data: any[]) {
    const qcm: Question[] = [];
    for (let i = 1; i < data.length; i++) {
      const item: any[] = data[i];
      console.log(item.slice(-(item.length - 2)));
      qcm.push({
        title: item[0],
        type: item[1],
        reponses: item.slice(-(item.length - 2)),
      });
    }
    return qcm;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Question } from '../question/entities/question.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateFormationDto } from 'src/domain/dto/formations/create-formation.dto';
import { CreateFormulaireDto } from 'src/domain/dto/formulaires/create-formulaire.dto';

@Injectable()
export class FormulairesService {
  constructor(private prisma: PrismaService) {}

  create(createFormulaireDto: CreateFormulaireDto) {
    return this.prisma.formulaire.create({
      data: {
        title: createFormulaireDto.title,
        uuid: uuidv4(),
        description: createFormulaireDto.description,
        langage: createFormulaireDto.langage,
      },
    });
  }

  findAll() {
    return this.prisma.formulaire.findMany();
  }

  findOne(id: number) {
    return this.prisma.formulaire.findFirst({
      where: { id: id },
      include: {
        section: {
          include: {
            sous_sections: {
              include: {
                question: {
                  include: {
                    option: true,
                  },
                },
              },
            },
            question: {
              include: {
                option: true,
              },
            },
          },
        },
      },
    });
  }

  findByUuid(uuid: string) {
    return this.prisma.formulaire.findFirst({
      where: { uuid: uuid },
      include: {
        section: {
          include: {
            sous_sections: {
              include: {
                question: {
                  include: {
                    option: true,
                  },
                },
              },
            },
            question: {
              include: {
                option: true,
              },
            },
          },
        },
      },
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

  createFormulaireInvestigator(formulaireInvestigator) {
    try {
      return this.prisma.formulaireInvestigator.create({
        data: {
          formulaireId: formulaireInvestigator.formulaireId,
          userId: formulaireInvestigator.userId,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  getFormulaireInvestigator(userId, formulaireId) {
    return this.prisma.formulaireInvestigator.findMany({
      where: {
        AND: [{ userId: userId }, { formulaireId: formulaireId }],
      },
    });
  }

  async getNumberQuestionToAnswer(formulaireId) {
    const data: any = await this.prisma.$queryRaw`
      select CAST(count(distinct q.numero) AS CHAR) as questionNumber from Question as q
      inner join Section s on s.id = q.sectionId
      left join Section sous on sous.id = s.sectionId
      where s.formulaireId = ${formulaireId} or sous.formulaireId = ${formulaireId}
    `;
    console.log(data[0].questionNumber);
    return data[0].questionNumber;
  }

  getFormulaireByLangage(langage: string) {
    return this.prisma.formulaire.findFirst({
      where: {
        langage: langage,
      },
      include: {
        section: {
          include: {
            sous_sections: {
              include: {
                question: {
                  include: {
                    option: true,
                  },
                },
              },
            },
            question: {
              include: {
                option: true,
              },
            },
          },
        },
      },
    });
  }
}

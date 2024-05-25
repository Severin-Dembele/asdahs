import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import {PrismaService} from "../repositories/prisma/prisma.service";
import {CreateSoussectionDto} from "../soussection/dto/create-soussection.dto";

@Injectable()
export class SectionService {

  constructor(private readonly prisma: PrismaService) {}
  create(formulaireId:number, createSectionDto: CreateSectionDto) {
    return this.prisma.section.create({
      data:{
        title: createSectionDto.title,
        description: createSectionDto.description,
        formulaireId: formulaireId
      }
    });
  }

  createSousSection(sectionId:number, createSousSection: CreateSoussectionDto){
    return this.prisma.section.create({
      data:{
        title: createSousSection.title,
        description: createSousSection.description,
        section: {
          connect: {id: sectionId}
        }
      }
    })
  }

  findAll() {
    return this.prisma.section.findMany({
      where: {
        AND: [
          {deleteAt: null},
          {NOT: { formulaireId: null}}
        ]
      }
    });
  }

  findAllSectionByFormulaire(formulaireId: number){
    return this.prisma.section.findMany({
      where: {formulaireId: formulaireId},
      include:{
        sous_sections: {
          include:{
            question: true
          }
        },
        question: true
      }
    })
  }

  findAllSubSectionBySectionId(sectionId: number){
    return this.prisma.section.findMany({
      where:{
        AND:[
          {sectionId: sectionId},
        ]
      }
    })
  }

  findOne(id: number) {
    return this.prisma.section.findUnique({
      where: {id: id},
      include:{
        section: true
      }
    });
  }

  update(id: number, updateSectionDto: UpdateSectionDto) {
    return this.prisma.section.update({
      where: {id: id},
      data:{
        title: updateSectionDto.title,
        description: updateSectionDto.description
      }
    })
  }

  remove(id: number) {
    return this.prisma.section.update({
      where: { id: id},
      data:{
        deleteAt: new Date()
      }
    });
  }
}

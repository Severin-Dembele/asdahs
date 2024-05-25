import { Injectable } from '@nestjs/common';
import { CreateSoussectionDto } from './dto/create-soussection.dto';
import { UpdateSoussectionDto } from './dto/update-soussection.dto';
import {PrismaService} from "../repositories/prisma/prisma.service";

@Injectable()
export class SoussectionService {
  constructor(private prisma: PrismaService) {
  }
  create(createSoussectionDto: CreateSoussectionDto) {
    return 'This action adds a new soussection';
  }

  findAll() {
    return this.prisma.section.findMany({
      where: {formulaireId: null}
    });
  }

  findOne(id: number) {
    return this.prisma.section.findUnique({
      where: {id: id}
    });
  }

  update(id: number, updateSoussectionDto: UpdateSoussectionDto) {
    return this.prisma.section.update({
      where: { id: id},
      data:{
        title: updateSoussectionDto.title,
        description: updateSoussectionDto.description
      }
    });
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

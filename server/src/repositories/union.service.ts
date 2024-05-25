import { CreateUnionDto } from 'src/domain/dto/unions/create-union.dto';
import { PrismaService } from './prisma/prisma.service';
import { UpdateUnionDto } from 'src/domain/dto/unions/update-union.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnionService {
  constructor(private prisma: PrismaService) {}

  create(divisionId: number, createUnionDto: CreateUnionDto) {
    return this.prisma.union.create({
      data: {
        name: createUnionDto.name,
        shortname: createUnionDto.shortname,
        divisionId: divisionId,
      },
    });
  }

  update(divisionId: number, updateUnionDto: UpdateUnionDto) {
    return this.prisma.union.update({
      where: { id: divisionId },
      data: {
        name: updateUnionDto.name,
        shortname: updateUnionDto.shortname,
      },
    });
  }

  findAll() {
    return this.prisma.union.findMany();
  }

  findById(unionId: number) {
    return this.prisma.union.findUnique({
      where: { id: unionId },
    });
  }
}

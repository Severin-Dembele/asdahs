import { CreateDivisionDto } from 'src/domain/dto/divisions/create-division.dto';
import { PrismaService } from './prisma/prisma.service';
import { UpdateDivisionDto } from 'src/domain/dto/divisions/update-division.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DivisionService {
  constructor(private prisma: PrismaService) {}

  create(createDivisionDto: CreateDivisionDto) {
    return this.prisma.division.create({
      data: {
        name: createDivisionDto.name,
        shortname: createDivisionDto.shortname,
      },
    });
  }

  update(divisionId: number, updateDivisionDto: UpdateDivisionDto) {
    return this.prisma.division.update({
      where: { id: divisionId },
      data: {
        name: updateDivisionDto.name,
        shortname: updateDivisionDto.shortname,
      },
    });
  }

  findAll() {
    return this.prisma.division.findMany();
  }

  findById(divisionId: number) {
    return this.prisma.division.findUnique({
      where: { id: divisionId },
    });
  }

  delete(divisionId: number) {
    return this.prisma.division.update({
      where: { id: divisionId },
      data: {
        deleteAt: new Date(),
      },
    });
  }
}

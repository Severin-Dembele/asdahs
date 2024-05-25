import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateChurchDto } from 'src/domain/dto/church/create-church.dto';
import { UpdateChurchDto } from 'src/domain/dto/church/update-church.dto';

@Injectable()
export class ChurchService {
  constructor(private readonly prisma: PrismaService) {}

  create(conferenceId: number, createChurchDto: CreateChurchDto) {
    return this.prisma.church.create({
      data: {
        city: createChurchDto.city,
        country: createChurchDto.country,
        name: createChurchDto.name,
        conferenceId: conferenceId,
      },
    });
  }

  findAll() {
    return this.prisma.church.findMany();
  }

  findById(churchId: number) {
    return this.prisma.church.findUnique({
      where: { id: churchId },
    });
  }

  findAllByConference(idConference: number) {
    return this.prisma.church.findMany({
      where: { conferenceId: idConference },
    });
  }

  update(churchId: number, updateChurchDto: UpdateChurchDto) {
    return this.prisma.church.update({
      where: { id: churchId },
      data: {
        city: updateChurchDto.city,
        country: updateChurchDto.country,
        name: updateChurchDto.name,
      },
    });
  }
}

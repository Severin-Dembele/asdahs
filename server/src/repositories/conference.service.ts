import { CreateConferenceDto } from 'src/domain/dto/conference/create-conference.dto';
import { PrismaService } from './prisma/prisma.service';
import { UpdateConferenceDto } from 'src/domain/dto/conference/update-conference.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConferenceService {
  constructor(private prisma: PrismaService) {}

  create(unionId: number, createConferenceDto: CreateConferenceDto) {
    return this.prisma.conference.create({
      data: {
        name: createConferenceDto.name,
        shortname: createConferenceDto.shortname,
        unionId: unionId,
      },
    });
  }

  update(conferenceId, updateConferenceDto: UpdateConferenceDto) {
    return this.prisma.conference.update({
      where: { id: conferenceId },
      data: {
        name: updateConferenceDto.name,
        shortname: updateConferenceDto.shortname,
      },
    });
  }

  findAll() {
    return this.prisma.conference.findMany();
  }

  findById(conferenceId: number) {
    console.log(conferenceId);
    return this.prisma.conference.findUnique({
      where: { id: conferenceId },
    });
  }
}

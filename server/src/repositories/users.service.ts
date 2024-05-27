import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/users/create-user.dto';
import { UpdateUserDto } from '../domain/dto/users/update-user.dto';
import { PrismaService } from './prisma/prisma.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const argon2 = require('argon2');

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(idChurch: number, createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        password: await argon2.hash(createUserDto.password),
        profile: createUserDto.profile,
        email: createUserDto.email,
        name: createUserDto.name,
        telephone: createUserDto.telephone,
        role: createUserDto.role,
        status: 'NOT_STARTED',
        churchId: idChurch,
      },
    });
  }

  findAllUniqueNameUser() {
    return this.prisma.user.findMany({
      where: {
        OR: [{ role: 'ADMIN' }, { role: 'INVESTIGATOR' }],
      },
      orderBy: {
        createAt: 'desc',
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        church: {
          include: {
            conference: {
              include: {
                union: {
                  include: {
                    division: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        email: username,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
        telephone: updateUserDto.telephone,
        role: updateUserDto.role,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findAllReponseUsers(userId: number) {
    return this.prisma.user.findMany({
      where: {
        id: userId,
      },
      include: {
        reponseRepondu: {
          include: {
            question: {
              include: {
                reponseRepondu: true,
              },
            },
          },
        },
      },
    });
  }
}

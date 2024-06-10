import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/users/create-user.dto';
import { UpdateUserDto } from '../domain/dto/users/update-user.dto';
import { PrismaService } from './prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const argon2 = require('argon2');

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        password: await argon2.hash(createUserDto.password),
        profile: createUserDto.profile,
        email: createUserDto.email == null ? uuidv4() : createUserDto.email,
        name: createUserDto.name,
        telephone: createUserDto.telephone,
        role: createUserDto.role,
        status: 'NOT_STARTED',
        userCreated: createUserDto.userConnected,
        churchName: createUserDto.churchName,
        typeChurch: createUserDto.typeChurch,
        conferenceId:
          createUserDto.conferenceId == null
            ? null
            : parseInt(createUserDto.conferenceId),
        selfResponse:
          createUserDto.selfResponse == null
            ? null
            : createUserDto.selfResponse == 'true',
        langage: createUserDto.langage == null ? null : createUserDto.langage,
      },
    });
  }

  async updatePassword(userId, password) {
    return this.prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        password: await argon2.hash(password),
      },
    });
  }

  acceptToAnswer(userId: string, userResponse) {
    return this.prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        acceptResponse: userResponse.acceptToAnswer,
      },
    });
  }

  findAllUniqueNameUser() {
    return this.prisma.$queryRaw`
    select u.id, u.name, u.email, u.telephone, u.churchName, CAST(count(f.userId) AS CHAR) as nb_formulaire 
        from User u 
    left join formulaireInvestigator f on f.userId = u.id 
    where u.role = "ADMIN" or u.role = "INVESTIGATOR"
     group by u.id, u.name, u.email, u.telephone, u.churchName
  `;
    /*  return this.prisma.user.findMany({
      where: {
        OR: [{ role: 'ADMIN' }, { role: 'INVESTIGATOR' }],
      },
      orderBy: {
        createAt: 'desc',
      },
    });*/
  }

  findAll() {
    return this.prisma.user.findMany({
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
      orderBy: {
        createAt: 'desc',
      },
    });
  }

  findByUserCreated(username: string) {
    return this.prisma.user.findMany({
      where: {
        userCreated: username,
      },
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

  async updateStatus(userId: number) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: 'PROGRESS',
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
        churchName: updateUserDto.churchName,
        typeChurch: updateUserDto.typeChurch,
        conferenceId:
          updateUserDto.conferenceId == null
            ? null
            : parseInt(updateUserDto.conferenceId),
        selfResponse:
          updateUserDto.selfResponse == null
            ? null
            : updateUserDto.selfResponse == 'true',
        langage: updateUserDto.langage == null ? null : updateUserDto.langage,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findAllReponseUsers(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: parseInt(userId),
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

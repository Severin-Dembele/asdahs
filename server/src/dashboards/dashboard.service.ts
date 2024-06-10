import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/repositories/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  getNotStartedInProgressAndCompleted() {
    return this.prisma.$queryRaw`
      select SUM(case when u.status = 'PROGRESS' then 1 else 0 end) as nb_progress,
       SUM( case when u.status = 'CLOSED' then 1 else 0 end) as nb_completed,
       SUM(case when u.status = 'NOT_STARTED' then 1 else 0 end) as nb_no_started
       from User as u
    `;
  }

  getNotStartedInProgressAndCompletedGroupByTypeChurch() {
    return this.prisma.$queryRaw`
      select typeChurch,
       SUM(case when u.status = 'PROGRESS' then 1 else 0 end) as nb_progress,
       SUM( case when u.status = 'CLOSED' then 1 else 0 end) as nb_completed,
       SUM(case when u.status = 'NOT_STARTED' then 1 else 0 end) as nb_no_started
       from User as u
       group by u.typeChurch
    `;
  }

  getNotStartedInProgressAndCompletedGroupByConference() {
    return this.prisma.$queryRaw`
      select conferenceId,
       SUM(case when u.status = 'PROGRESS' then 1 else 0 end) as nb_progress,
       SUM( case when u.status = 'CLOSED' then 1 else 0 end) as nb_completed,
       SUM(case when u.status = 'NOT_STARTED' then 1 else 0 end) as nb_no_started
       from User as u
       group by u.conferenceId
    `;
  }

  getNotStartedInProgressAndCompletedGroupByUnion() {
    return this.prisma.$queryRaw`
      select u2.id as unionId,
       SUM(case when u.status = 'PROGRESS' then 1 else 0 end) as nb_progress,
       SUM( case when u.status = 'CLOSED' then 1 else 0 end) as nb_completed,
       SUM(case when u.status = 'NOT_STARTED' then 1 else 0 end) as nb_no_started
       from User u
       inner join Conference c on c.id = u.conferenceId 
       inner join Union u2 on u2.id = c.unionId 
       group by u2.id
    `;
  }
}

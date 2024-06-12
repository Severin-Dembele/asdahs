import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { AuthService } from 'src/repositories/auth/auth.service';
import { UsersService } from 'src/repositories/users.service';

@Controller('dashboard')
@ApiTags('dashboard')
export class DashboardController {
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('statistiques')
  async getNotStartedInProgressAndCompleted(@Req() request: Request) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const user = await this.usersService.findOne(parseInt(data.sub));
    if (user.role == 'INVESTIGATOR') {
      return this.dashboardService.getNotStartedInProgressAndCompletedRespondent(
        user.email,
      );
    } else {
      return this.dashboardService.getNotStartedInProgressAndCompleted();
    }
  }

  @Get('respondents/statistiques')
  async getNotStartedInProgressAndCompletedRespondent(@Req() request: Request) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const user = await this.usersService.findOne(parseInt(data.sub));
    return this.dashboardService.getNotStartedInProgressAndCompletedRespondent(
      user.email,
    );
  }

  @Get('statistiques/group-by-church')
  async getNotStartedInProgressAndCompletedGroupByTypeChurch(
    @Req() request: Request,
  ) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const user = await this.usersService.findOne(parseInt(data.sub));
    if (user.role == 'INVESTIGATOR') {
      return this.dashboardService.getNotStartedInProgressAndCompletedGroupByTypeChurchRespondent(
        user.email,
      );
    } else {
      return this.dashboardService.getNotStartedInProgressAndCompletedGroupByTypeChurch();
    }
  }

  @Get('statistiques/group-by-conference')
  async getNotStartedInProgressAndCompletedGroupByConference(
    @Req() request: Request,
  ) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const user = await this.usersService.findOne(parseInt(data.sub));
    if (user.role == 'INVESTIGATOR') {
      return this.dashboardService.getNotStartedInProgressAndCompletedGroupByConferenceRespondent(
        user.email,
      );
    } else {
      return this.dashboardService.getNotStartedInProgressAndCompletedGroupByConference();
    }
  }

  @Get('statistiques/group-by-union')
  async getNotStartedInProgressAndCompletedGroupByUnion(
    @Req() request: Request,
  ) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const user = await this.usersService.findOne(parseInt(data.sub));
    if (user.role == 'INVESTIGATOR') {
      return this.dashboardService.getNotStartedInProgressAndCompletedGroupByUnionRespondent(
        user.email,
      );
    } else {
      return this.dashboardService.getNotStartedInProgressAndCompletedGroupByUnion();
    }
  }
}

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
  getNotStartedInProgressAndCompleted() {
    console.log('not started in progress and completed');
    return this.dashboardService.getNotStartedInProgressAndCompleted();
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
  getNotStartedInProgressAndCompletedGroupByTypeChurch() {
    return this.dashboardService.getNotStartedInProgressAndCompletedGroupByTypeChurch();
  }

  @Get('respondents/statistiques/group-by-church')
  async getNotStartedInProgressAndCompletedGroupByTypeChurchRespondent(
    @Req() request: Request,
  ) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const user = await this.usersService.findOne(parseInt(data.sub));
    return this.dashboardService.getNotStartedInProgressAndCompletedGroupByTypeChurchRespondent(
      user.email,
    );
  }

  @Get('statistiques/group-by-conference')
  getNotStartedInProgressAndCompletedGroupByConference() {
    return this.dashboardService.getNotStartedInProgressAndCompletedGroupByConference();
  }

  @Get('respondents/group-by-conference')
  async getNotStartedInProgressAndCompletedGroupByConferenceRespondent(
    @Req() request: Request,
  ) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const user = await this.usersService.findOne(parseInt(data.sub));
    return this.dashboardService.getNotStartedInProgressAndCompletedGroupByConferenceRespondent(
      user.email,
    );
  }

  @Get('statistiques/group-by-union')
  getNotStartedInProgressAndCompletedGroupByUnion() {
    return this.dashboardService.getNotStartedInProgressAndCompletedGroupByUnion();
  }
}

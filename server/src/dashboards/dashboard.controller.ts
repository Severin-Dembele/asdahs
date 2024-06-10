import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@ApiTags('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('statistiques')
  getNotStartedInProgressAndCompleted() {
    console.log('not started in progress and completed');
    return this.dashboardService.getNotStartedInProgressAndCompleted();
  }

  @Get('statistiques/group-by-church')
  getNotStartedInProgressAndCompletedGroupByTypeChurch(){
    return this.dashboardService.getNotStartedInProgressAndCompletedGroupByTypeChurch();
  }

  @Get('statistiques/group-by-conference')
  getNotStartedInProgressAndCompletedGroupByConference(){
    return this.dashboardService.getNotStartedInProgressAndCompletedGroupByConference();
  }
   
  @Get('statistiques/group-by-union')
  getNotStartedInProgressAndCompletedGroupByUnion(){
    return this.dashboardService.getNotStartedInProgressAndCompletedGroupByUnion();
  }
}

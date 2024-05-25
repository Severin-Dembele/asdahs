import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateConferenceDto } from 'src/domain/dto/conference/create-conference.dto';
import { UpdateConferenceDto } from 'src/domain/dto/conference/update-conference.dto';
import { ConferenceService } from 'src/repositories/conference.service';

@Controller()
@ApiTags('Conferences')
export class ConferenceController {
  constructor(private readonly conferenceService: ConferenceService) {}

  @Post('unions/:id/conferences')
  create(@Param('id') id: number, @Body() createConferenceDto) {
    console.log(createConferenceDto);
    return this.conferenceService.create(id, createConferenceDto);
  }

  @Put('unions/:id/conferences/:conferenceId')
  update(
    @Param('id') id: number,
    @Param('conferenceId') conferenceId: number,
    @Body() updateConferenceDto: UpdateConferenceDto,
  ) {
    return this.conferenceService.update(conferenceId, updateConferenceDto);
  }

  @Get('conferences')
  findAll() {
    return this.conferenceService.findAll();
  }

  @Get('conferences/:id')
  findById(@Param('id') id) {
    console.log(id);
    return this.conferenceService.findById(id);
  }
}

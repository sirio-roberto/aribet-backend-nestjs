import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @Get('today')
  getTodaysResult() {
    return this.resultsService.getTodaysWithBets();
  }

  @HttpCode(HttpStatus.OK)
  @Post('today')
  setTodaysTime(@Body() timeObj: Record<string, Date>) {
    return this.resultsService.setTime(timeObj.time);
  }
}

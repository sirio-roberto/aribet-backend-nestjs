import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as ExpressRequest } from 'express';

@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createBetDto: CreateBetDto,
    @Request() req: ExpressRequest | any,
  ) {
    return this.betsService.create(createBetDto, req.user.sub);
  }

  @Get('today/all')
  findAll() {
    return this.betsService.findAll(new Date());
  }

  @UseGuards(AuthGuard)
  @Get('hasBetToday')
  hasBetDay(@Request() req: ExpressRequest | any): Promise<boolean> {
    return this.betsService.hasBetToday(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('today')
  findOne(@Request() req: ExpressRequest | any) {
    return this.betsService.findTodaysBet(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateBetDto: UpdateBetDto,
    @Request() req: ExpressRequest | any,
  ) {
    return this.betsService.update(id, updateBetDto, req.user.sub);
  }
}

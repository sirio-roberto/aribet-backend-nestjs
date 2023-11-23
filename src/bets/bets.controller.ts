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

  @Get('today')
  findAll() {
    return this.betsService.findAll(new Date());
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.betsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateBetDto: UpdateBetDto,
  ) {
    return this.betsService.update(id, updateBetDto);
  }
}

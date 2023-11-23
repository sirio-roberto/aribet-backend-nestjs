import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';

@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  create(@Body() createBetDto: CreateBetDto) {
    return this.betsService.create(createBetDto);
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

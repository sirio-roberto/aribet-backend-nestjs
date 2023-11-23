import { Injectable } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResultsService } from 'src/results/results.service';

@Injectable()
export class BetsService {
  constructor(
    private prisma: PrismaService,
    private resultsService: ResultsService,
  ) {}

  async create(createBetDto: CreateBetDto) {
    const result = await this.resultsService.getTodaysResult();
    createBetDto.resultId = result.id;

    return this.prisma.bet.create({
      data: createBetDto,
    });
  }

  findAll(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.bet.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.bet.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateBetDto: UpdateBetDto) {
    return this.prisma.bet.update({
      where: { id },
      data: updateBetDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} bet`;
  }
}

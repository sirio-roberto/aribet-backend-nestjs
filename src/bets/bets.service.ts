import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResultsService } from 'src/results/results.service';
import { isDate } from 'class-validator';

@Injectable()
export class BetsService {
  constructor(
    private prisma: PrismaService,
    private resultsService: ResultsService,
  ) {}

  async create(createBetDto: CreateBetDto, userId: number) {
    if (!isDate(createBetDto.time)) {
      createBetDto.time = this.fixDate(createBetDto.time);
    }
    const result = await this.resultsService.getTodaysResult();
    if (result.time) {
      throw new BadRequestException('Bet time is up');
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todaysBet = await this.prisma.bet.findFirst({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
        userId,
      },
    });

    if (todaysBet) {
      throw new BadRequestException(
        'You have already bet today. Bet id: ' + todaysBet.id,
      );
    }

    const betWithSameTime = await this.prisma.bet.findFirst({
      where: {
        time: createBetDto.time,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    if (betWithSameTime) {
      throw new InternalServerErrorException(
        'There is already a bet with this value',
      );
    }

    createBetDto.resultId = result.id;
    createBetDto.userId = userId;

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

  async update(id: number, updateBetDto: UpdateBetDto, userId: number) {
    try {
      await this.prisma.bet.findUniqueOrThrow({
        where: { id, userId },
      });
    } catch {
      throw new UnauthorizedException("You cannot update other user's bet");
    }

    if (!isDate(updateBetDto.time)) {
      updateBetDto.time = this.fixDate(updateBetDto.time);
    }

    return this.prisma.bet.update({
      where: { id },
      data: updateBetDto,
    });
  }

  // method used to set the date of the time fields when users submit only the hours and minutes
  private fixDate(time: string): string {
    const timeArray = time.split(':');
    const hours = parseInt(timeArray[0]);
    const mins = parseInt(timeArray[1]);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(mins);

    return date.toISOString();
  }
}

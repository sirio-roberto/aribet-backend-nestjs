import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResultsService {
  constructor(private prisma: PrismaService) {}

  async getTodaysWithBets() {
    const result = await this.getTodaysResult();
    const linkedBets = await this.prisma.bet.findMany({
      where: { resultId: result.id },
    });

    return Object.assign(result, { bets: linkedBets });
  }

  async getTodaysResult() {
    const result = await this.findOne(new Date());
    return result ?? (await this.create());
  }

  create(date?: Date) {
    const time = date ?? null;
    return this.prisma.result.create({
      data: { time },
    });
  }

  findOne(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.result.findFirst({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  }

  async setTime(date: Date) {
    const result = await this.getTodaysResult();
    const updatedResult = await this.prisma.result.update({
      where: { id: result.id },
      data: { time: date },
    });
    return updatedResult;
  }
}

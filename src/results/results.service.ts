import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getWinner(today: boolean) {
    if (today) {
      const resultWithBets = await this.getTodaysWithBets();
      if (!resultWithBets.time) {
        throw new BadRequestException(
          'Result time was not set yet. Define it before calculating the winner',
        );
      }
      const resultTime = resultWithBets.time.getTime();

      const timeDiffs = resultWithBets.bets.map((bet) => {
        const time = bet.time.getTime();
        return Math.abs(resultTime - time);
      });
      const minTime = Math.min(...timeDiffs);

      const winners = resultWithBets.bets.filter((bet) => {
        const time = bet.time.getTime();
        return Math.abs(resultTime - time) === minTime;
      });

      const winnerIds: number[] = winners.map((bet) => bet.userId);

      const users = await this.prisma.user.findMany({
        where: {
          id: {
            in: winnerIds,
          },
        },
      });

      const usersMap = new Map();
      users.forEach((user) => usersMap.set(user.id, user.name));

      const result = winners.map((bet) => {
        const name = usersMap.get(bet.userId);
        const finalTime = this.getFormattedDate(resultWithBets.time);
        const guessedTime = this.getFormattedDate(bet.time);
        const description = bet.description;

        return {
          betId: bet.id,
          userId: bet.userId,
          name,
          finalTime,
          guessedTime,
          description,
        };
      });

      return result;
    }
  }

  private getFormattedDate(date: Date) {
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: 'UTC', // GMT-3 timezone
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Bet } from './entities/bet.entity';

@Injectable()
export class AppService {
  getHello(): Bet {
    return new Bet(123, new Date('2023-11-06T12:00:00'));
  }
}

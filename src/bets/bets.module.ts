import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';
import { ResultsModule } from 'src/results/results.module';

@Module({
  imports: [ResultsModule],
  controllers: [BetsController],
  providers: [BetsService],
})
export class BetsModule {}

export class Bet {
  id: number;
  userId: number;
  timeCreated: Date;
  timeUpdated: Date;
  betTime: Date;

  constructor(userId: number, betTime: Date) {
    this.userId = userId;
    this.timeCreated = new Date();
    this.timeUpdated = new Date();
    this.betTime = betTime;
  }
}

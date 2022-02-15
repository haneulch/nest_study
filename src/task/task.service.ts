import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  @Cron('0 0 0 * * *', { name: 'test task' })
  testTask() {
    Logger.log(`Task Called ${Date.now()}`);
  }

  @Cron(CronExpression.EVERY_MINUTE, { name: 'Cron Expression Task' })
  cronExpressionTask() {
    Logger.log('Cron Task');
  }
}

import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { NotificationsController } from './notification.controller';

import { NotificationsService } from './notification.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [LoggerModule],
  exports: [NotificationsService],
})
export class NotificationModule {}

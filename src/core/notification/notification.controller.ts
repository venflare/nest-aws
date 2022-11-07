import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PolicyGuard } from '../authorization/guards';
import { EnqueueEmailDto } from './dtos';
import { NotificationsService } from './notification.service';

@Controller('api/v1/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(PolicyGuard('enqueue-email:Notification'))
  @HttpCode(HttpStatus.CREATED)
  @Post('/enqueue-email')
  sendEmail(@Body() enqueueEmailDto: EnqueueEmailDto): HttpStatus {
    return this.notificationsService.enqueueEmail(enqueueEmailDto);
  }
}

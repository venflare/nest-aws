import { Controller, Post, Query } from '@nestjs/common';

import { ParseOptionalIntPipe } from '../../../common/pipes';
import { SeederService } from './seeder.service';

@Controller('api/v1/util/seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('seed')
  seed(@Query('iterations', ParseOptionalIntPipe) iterations?: number) {
    return this.seederService.seed(iterations);
  }
}

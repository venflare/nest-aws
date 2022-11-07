import { Module } from '@nestjs/common';

import { UsersModule } from '../../../users/users.module';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  controllers: [SeederController],
  imports: [UsersModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}

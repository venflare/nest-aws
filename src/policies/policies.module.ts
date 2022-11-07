import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';
import { Policy } from './entities';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [PoliciesController],
  providers: [PoliciesService],
  imports: [TypeOrmModule.forFeature([Policy]), UsersModule],
  exports: [PoliciesService],
})
export class PoliciesModule {}

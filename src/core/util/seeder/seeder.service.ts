import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as Chance from 'chance';

import { UsersService } from '../../../users/users.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async seed(iterations = 10) {
    const chance = new Chance();

    await this.dataSource.synchronize(true);

    // TODO: Use Promise.all instead of for.
    for (let iteration = 0; iteration < iterations; iteration++) {
      await this.usersService.create({
        firstName: chance.first(),
        lastName: chance.last(),
        email: `user${iteration + 1}@venflare.com`,
        password: 'venflare',
        policies: [
          {
            action: 'create:User',
          },
          {
            action: 'read:User',
          },
          {
            action: 'update:User',
          },
          {
            action: 'delete:User',
          },
          {
            action: 'create:Policy',
          },
          {
            action: 'read:Policy',
          },
          {
            action: 'update:Policy',
          },
          {
            action: 'delete:Policy',
          },
        ],
      });
    }

    this.logger.log('Database seeded successfully.');

    return {
      message: 'Database seeded successfully.',
      entities: {
        User: iterations,
        Policy: iterations * 8,
      },
    };
  }
}

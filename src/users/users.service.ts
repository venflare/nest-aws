import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { DatabaseErrorCode } from '../common/enums';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { User } from './entities';
import { NotificationsService } from '../core/notification/notification.service';

// TODO: Allow bulk operations.
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);

    try {
      const response = await this.usersRepository.save(user);

      this.notificationsService.enqueueEmail({
        userFirstName: user.firstName,
        userLastName: user.lastName,
        userGreetingName: `${user.firstName} ${user.lastName}`,
        emailSubject: 'Account Created!',
        emailMessage: 'your account has been created successfully',
        emailTo: user.email,
      });

      return response;
    } catch (error) {
      if (error.code === DatabaseErrorCode.UniqueViolation) {
        throw new BadRequestException(`${user.email} is already taken.`);
      }

      throw new InternalServerErrorException();
    }
  }

  async read(options?: FindManyOptions<User>) {
    return await this.usersRepository.find(options);
  }

  async readOne(where: FindOptionsWhere<User>, options?: FindOneOptions<User>) {
    options ??= {};
    options.where = { ...options.where, ...where };

    const user = await this.usersRepository.findOne(options);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async update(where: FindOptionsWhere<User>, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy(where);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    Object.assign(user, updateUserDto);

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === DatabaseErrorCode.UniqueViolation) {
        throw new BadRequestException(`${user.email} is already taken.`);
      }

      throw new InternalServerErrorException();
    }
  }

  async delete(where: FindOptionsWhere<User>) {
    const user = await this.usersRepository.findOneBy(where);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const response = this.usersRepository.remove(user);

    this.notificationsService.enqueueEmail({
      userFirstName: user.firstName,
      userLastName: user.lastName,
      userGreetingName: `${user.firstName} ${user.lastName}`,
      emailSubject: 'Account Deletion!',
      emailMessage: 'your account has been deleted successfully',
      emailTo: user.email,
    });

    return response;
  }
}

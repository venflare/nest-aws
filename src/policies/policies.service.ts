import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Equal,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { UsersService } from '../users/users.service';
import { CreatePolicyDto, UpdatePolicyDto } from './dtos';
import { Policy } from './entities';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectRepository(Policy)
    private readonly policiesRepository: Repository<Policy>,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: number, createPolicyDto: CreatePolicyDto) {
    const user = await this.usersService.readOne({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const policy = this.policiesRepository.create({ ...createPolicyDto, user });

    return await this.policiesRepository.save(policy);
  }

  async read(userId: number, options?: FindManyOptions<Policy>) {
    const user = await this.usersService.readOne({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    options ??= {};
    options.where = { ...options.where, user: Equal(userId) };

    return await this.policiesRepository.find(options);
  }

  async readOne(
    userId: number,
    where: FindOptionsWhere<Policy>,
    options?: FindOneOptions<Policy>,
  ) {
    const user = await this.usersService.readOne({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    options ??= {};
    options.where = { ...options.where, ...where, user: Equal(userId) };

    const policy = await this.policiesRepository.findOne(options);

    if (!policy) {
      throw new NotFoundException('Policy not found.');
    }

    return policy;
  }

  async update(
    userId: number,
    where: FindOptionsWhere<Policy>,
    updatePolicyDto: UpdatePolicyDto,
  ) {
    const user = await this.usersService.readOne({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const policy = await this.policiesRepository.findOneBy({
      ...where,
      user: Equal(userId),
    });

    if (!policy) {
      throw new NotFoundException('Policy not found.');
    }

    Object.assign(policy, updatePolicyDto);

    return await this.policiesRepository.save(policy);
  }

  async delete(userId: number, where: FindOptionsWhere<Policy>) {
    const user = await this.usersService.readOne({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const policy = await this.policiesRepository.findOneBy({
      ...where,
      user: Equal(userId),
    });

    if (!policy) {
      throw new NotFoundException('Policy not found.');
    }

    return await this.policiesRepository.remove(policy);
  }
}

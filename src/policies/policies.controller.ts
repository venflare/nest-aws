import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';

import { Serialize } from '../common/interceptors';
import {
  ParseFilterPipe,
  ParseOptionalIntPipe,
  ParseRelationsPipe,
  ParseSelectPipe,
  ParseSortPipe,
} from '../common/pipes';
import { PolicyGuard } from '../core/authorization/guards';
import { CreatePolicyDto, ReadPolicyDto, UpdatePolicyDto } from './dtos';
import { Policy } from './entities';
import { PoliciesService } from './policies.service';

@Controller('api/v1/users/:userId/policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Serialize(ReadPolicyDto)
  @UseGuards(PolicyGuard('create:Policy'))
  @Post()
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPolicyDto: CreatePolicyDto,
  ) {
    return await this.policiesService.create(userId, createPolicyDto);
  }

  @Serialize(ReadPolicyDto)
  @UseGuards(PolicyGuard('read:Policy'))
  @Get()
  read(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('filter', ParseFilterPipe)
    filter?: FindOptionsWhere<Policy>[] | FindOptionsWhere<Policy>,
    @Query('select', ParseSelectPipe) select?: FindOptionsSelect<Policy>,
    @Query('relations', ParseRelationsPipe)
    relations?: FindOptionsRelations<Policy>,
    @Query('sort', ParseSortPipe) sort?: FindOptionsOrder<Policy>,
    @Query('limit', ParseOptionalIntPipe) limit?: number,
    @Query('skip', ParseOptionalIntPipe) skip?: number,
  ) {
    const options: FindManyOptions<Policy> = {};

    if (filter) options.where = filter;
    if (select) options.select = select;
    if (relations) options.relations = relations;
    if (sort) options.order = sort;
    if (limit) options.take = limit;
    if (skip) options.skip = skip;

    return this.policiesService.read(userId, options);
  }

  @Serialize(ReadPolicyDto)
  @UseGuards(PolicyGuard('read:Policy'))
  @Get(':policyId')
  readById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('policyId', ParseIntPipe) policyId: number,
    @Query('select', ParseSelectPipe) select?: FindOptionsSelect<Policy>,
    @Query('relations', ParseRelationsPipe)
    relations?: FindOptionsRelations<Policy>,
  ) {
    const options: FindOneOptions<Policy> = {};

    if (select) options.select = select;
    if (relations) options.relations = relations;

    return this.policiesService.readOne(userId, { id: policyId }, options);
  }

  @Serialize(ReadPolicyDto)
  @UseGuards(PolicyGuard('update:Policy'))
  @Patch(':policyId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('policyId', ParseIntPipe) policyId: number,
    @Body() updatePolicyDto: UpdatePolicyDto,
  ) {
    return await this.policiesService.update(
      userId,
      { id: policyId },
      updatePolicyDto,
    );
  }

  @Serialize(ReadPolicyDto)
  @UseGuards(PolicyGuard('delete:Policy'))
  @Delete(':policyId')
  async delete(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('policyId', ParseIntPipe) policyId: number,
  ) {
    return await this.policiesService.delete(userId, { id: policyId });
  }
}

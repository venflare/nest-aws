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
import { CreateUserDto, ReadUserDto, UpdateUserDto } from './dtos';
import { User } from './entities';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(ReadUserDto)
  @UseGuards(PolicyGuard('create:User'))
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Serialize(ReadUserDto)
  @UseGuards(PolicyGuard('read:User'))
  @Get()
  async read(
    @Query('filter', ParseFilterPipe)
    filter?: FindOptionsWhere<User>[] | FindOptionsWhere<User>,
    @Query('select', ParseSelectPipe) select?: FindOptionsSelect<User>,
    @Query('relations', ParseRelationsPipe)
    relations?: FindOptionsRelations<User>,
    @Query('sort', ParseSortPipe) sort?: FindOptionsOrder<User>,
    @Query('limit', ParseOptionalIntPipe) limit?: number,
    @Query('skip', ParseOptionalIntPipe) skip?: number,
  ) {
    const options: FindManyOptions<User> = {};

    if (filter) options.where = filter;
    if (select) options.select = select;
    if (relations) options.relations = relations;
    if (sort) options.order = sort;
    if (limit) options.take = limit;
    if (skip) options.skip = skip;

    return await this.usersService.read(options);
  }

  @Serialize(ReadUserDto)
  @UseGuards(PolicyGuard('read:User'))
  @Get(':id')
  async readById(
    @Param('id', ParseIntPipe) id: number,
    @Query('select', ParseSelectPipe) select?: FindOptionsSelect<User>,
    @Query('relations', ParseRelationsPipe)
    relations?: FindOptionsRelations<User>,
  ) {
    const options: FindOneOptions<User> = {};

    if (select) options.select = select;
    if (relations) options.relations = relations;

    return await this.usersService.readOne({ id }, options);
  }

  @Serialize(ReadUserDto)
  @UseGuards(PolicyGuard('update:User'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update({ id }, updateUserDto);
  }

  @Serialize(ReadUserDto)
  @UseGuards(PolicyGuard('delete:User'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete({ id });
  }
}

import {
  BaseIdEntity,
  BaseService,
  ListOptions,
  ListOptionsQuery,
  Relation,
} from '@awesome-dev/server-common';
import { PartialDeep } from '@awesome-dev/typings';
import { Body, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';

export abstract class BaseAdminController<Entity extends BaseIdEntity> {
  constructor(protected readonly service: BaseService<Entity>) {}

  @Get('/count')
  count(@ListOptionsQuery({ acceptRelations: true }) listOptions: ListOptions<Entity>) {
    return this.service.count(listOptions);
  }

  @Get()
  list(@ListOptionsQuery({ acceptRelations: true }) listOptions: ListOptions<Entity>) {
    return this.service.list(listOptions);
  }

  @Post()
  create(@Body() body: PartialDeep<Entity>) {
    return this.service.create(body);
  }

  @Get('/:id')
  read(@Param('id', ParseIntPipe) id: number, @Query('relations') relations: Relation<Entity>[]) {
    return this.service.get(id, relations);
  }

  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: PartialDeep<Entity>) {
    return this.service.update(id, body);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

import {
  BaseIdEntity,
  BaseService,
  ListOptions,
  ListOptionsQuery,
} from '@awesome-dev/server-common';
import { Body, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

export abstract class BaseAdminController<Entity extends BaseIdEntity> {
  constructor(protected readonly service: BaseService<Entity>) {}

  @Get('/count')
  count(@ListOptionsQuery() listOptions: ListOptions<Entity>) {
    return this.service.count(listOptions);
  }

  @Get()
  list(@ListOptionsQuery() listOptions: ListOptions<Entity>) {
    return this.service.list(listOptions);
  }

  @Post()
  create(@Body() body: Partial<Entity>) {
    return this.service.create(body);
  }

  @Get('/:id')
  read(@Param('id', ParseIntPipe) id: number) {
    return this.service.get(id);
  }

  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Entity>) {
    return this.service.update(id, body);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

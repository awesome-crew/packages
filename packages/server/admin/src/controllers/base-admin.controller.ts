import {
  BaseIdEntity,
  BaseService,
  ListOptions,
  ListOptionsQuery,
  Relation,
} from '@awesome-dev/server-common';
import { PartialDeep } from '@awesome-dev/typings';
import { Body, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';

/**
 * path는 '/admin/${toKebabCase(entityName)}s'으로 설정된다.
 * AdminController 데코레이터를 사용한 컨트롤러는 이 클래스를 상속받아야 한다.
 * AdminController 데코레이터를 사용한 컨트롤러는 CRUD와 entity의 개수를 가져오는 API를 자동으로 생성한다.
 */
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

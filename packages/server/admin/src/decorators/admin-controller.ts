import { type DecoratedEntityTarget } from '@awesome-dev/server-typeorm';
import { toKebabCase } from '@awesome-dev/utils';
import { Controller, UseGuards, applyDecorators } from '@nestjs/common';

import { AdminGuard } from '../providers';

/**
 * 어드민컨트롤러 데코레이터. path는 '/admin/${toKebabCase(entityName)}s'으로 설정된다.
 */
export function AdminController(entity: DecoratedEntityTarget) {
  const entityName = entity.name.replace('Entity', '');

  return applyDecorators(UseGuards(AdminGuard), Controller(`/admin/${toKebabCase(entityName)}s`));
}

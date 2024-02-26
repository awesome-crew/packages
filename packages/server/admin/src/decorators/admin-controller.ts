import { type DecoratedEntityTarget, getEntityMetadata } from '@awesome-dev/server-typeorm';
import { toKebabCase } from '@awesome-dev/utils';
import { Controller, UseGuards, applyDecorators } from '@nestjs/common';

import { AdminGuard } from '../providers';

/**
 * 어드민컨트롤러 데코레이터. path는 '/admin/${toKebabCase(entityName)}s'으로 설정된다.
 */
export function AdminController(entity: DecoratedEntityTarget) {
  const entityMetadata = getEntityMetadata(entity);

  if (!entityMetadata) {
    throw new Error(
      `@awesome-dev/server-admin ERROR::Entity metadata not found for ${entity.name}`
    );
  }
  if (!entityMetadata.name) {
    throw new Error(
      `@awesome-dev/server-admin ERROR::Entity name option not found for ${entity.name}`
    );
  }

  return applyDecorators(
    UseGuards(AdminGuard),
    Controller(`/admin/${toKebabCase(entityMetadata.name)}s`)
  );
}

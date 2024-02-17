import { EntityTarget, ObjectLiteral } from 'typeorm';
import { ENTITY_METADATA_KEY } from '../constants';

export function CustomRepository(target: EntityTarget<ObjectLiteral>) {
  return function (constructor: { new (...args: any[]): any }) {
    Reflect.defineMetadata(ENTITY_METADATA_KEY, target, constructor);
  };
}

import { EntityTarget, ObjectLiteral, getMetadataArgsStorage } from 'typeorm';

export function getEntityMetadata(entity: EntityTarget<ObjectLiteral>) {
  return getMetadataArgsStorage().tables.find(x => {
    x.target === entity;
  });
}

import { ENTITY_METADATA_KEY } from '../constants';
import { Repository } from '../interfaces';

export function getEntityByRepository(repository: Repository) {
  const entity = Reflect.getMetadata(ENTITY_METADATA_KEY, repository);

  if (!entity) {
    throw new Error(`Repository: ${repository.name} undetermined entity`);
  }

  return entity;
}

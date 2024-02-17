import { FindOneOptions } from '@awesome-dev/server-typeorm';
import { HttpStatus } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { ListOptions } from './decorators';
import { BaseIdEntity } from './entities';
import { BaseException } from './exceptions';

import { BaseRepository } from './base.repository';

export type EntityRelations<Entity> = Array<keyof Entity | `${string & keyof Entity}.${string}`>;

type EntityClass<Entity> = {
  new (partial: Partial<Entity>): Entity;
};

export abstract class BaseService<
  Entity extends BaseIdEntity,
  Relations = EntityRelations<Entity>,
> {
  abstract repository: BaseRepository<Entity>;

  get(id: number, relations?: Relations): Promise<Entity | null> {
    return this.repository.get(id, relations as unknown as string[]);
  }

  async list(options?: ListOptions<Entity>): Promise<Entity[]> {
    return await this.repository.find(options?.toFindOptions());
  }

  findOne(partial: FindOneOptions<Entity>, relations?: Relations): Promise<Entity | null> {
    return this.repository.findOne({
      relations: relations as unknown as string[],
      ...partial,
      ...instanceToPlain(partial),
    });
  }

  async count(options?: ListOptions<Entity>): Promise<number> {
    return await this.repository.count(options?.toFindOptions());
  }

  async assertBelongsTo(ids: number[], userId: number): Promise<void> {
    const isMine = await this.repository.checkBelongsTo(ids, userId);
    if (!isMine) {
      throw new BaseException({
        code: 'FORBIDDEN',
        message: '접근권한이 없습니다',
        status: HttpStatus.FORBIDDEN,
      });
    }
  }

  async remove(id: number) {
    const entity = await this.get(id);

    if (entity != null) {
      await this.repository.remove(entity);
    }
  }

  create(partial: Partial<Entity>) {
    return this.repository.save(new (this.repository.target as EntityClass<Entity>)(partial));
  }

  async update(id: number, partial: Partial<Entity>) {
    const existing = await this.get(id);

    return this.repository.save(
      new (this.repository.target as EntityClass<Entity>)({
        ...existing,
        ...partial,
      })
    );
  }
}

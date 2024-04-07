import { FindOneOptions } from '@awesome-dev/server-typeorm';
import { PartialDeep } from '@awesome-dev/typings';
import { HttpStatus } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { ListOptions } from './decorators';
import { BaseIdEntity } from './entities';
import { BaseException } from './exceptions';

import { BaseRepository } from './base.repository';

export type EntityRelations<Entity> = Array<keyof Entity | `${string & keyof Entity}.${string}`>;

type EntityClass<Entity> = {
  new (partial: PartialDeep<Entity>): Entity;
};

/**
 * BaseService는 BaseIdEntity를 상속받아 Entity를 사용하는 Service의 기본 메서드를 제공합니다.
 */
export abstract class BaseService<
  Entity extends BaseIdEntity,
  Relations = EntityRelations<Entity>,
> {
  abstract repository: BaseRepository<Entity>;

  /**
   * 해당 ID를 가진 Entity를 가져옵니다.
   * id: Entity ID
   * relations: 연결된 Entity를 가져올 때 사용할 Relation
   * 해당 ID를 가진 Entity가 존재하면 Entity, 존재하지 않을 때는 null을 반환합니다.
   */
  get(id: number, relations?: Relations): Promise<Entity | null> {
    const _relations = Array.isArray(relations) ? relations : [relations];

    return this.repository.get(
      id,
      _relations.filter(x => x != null)
    );
  }

  /**
   * Entity 목록을 가져옵니다.
   * options: ListOptions
   * ListOptions에 따라 Entity 목록을 가져옵니다.
   */
  async list(options?: ListOptions<Entity>): Promise<Entity[]> {
    return await this.repository.find(options?.toFindOptions());
  }

  /**
   * Entity를 하나 가져옵니다.
   * partial: FindOneOptions
   * relations: 연결된 Entity를 가져올 때 사용할 Relation
   */
  findOne(partial: FindOneOptions<Entity>, relations?: Relations): Promise<Entity | null> {
    return this.repository.findOne({
      relations: relations as unknown as string[],
      ...partial,
      ...instanceToPlain(partial),
    });
  }

  /**
   * Entity의 개수를 가져옵니다.
   * options: ListOptions
   * ListOptions에 따라 Entity의 개수를 가져옵니다.
   */
  async count(options?: ListOptions<Entity>): Promise<number> {
    return await this.repository.count(options?.toFindOptions());
  }

  /**
   * 해당 ID들을 가진 Entity가 특정 사용자에게 속하는지 확인합니다.
   * ids: Entity ID 배열
   * userId: 사용자 ID
   * 해당 ID들이 모두 특정 사용자에게 속하지 않으면 FORBIDDEN 예외를 발생시킵니다.
   */
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

  /**
   * 해당 ID를 가진 Entity를 삭제합니다.
   * id: Entity ID
   */
  async remove(id: number) {
    const entity = await this.get(id);

    if (entity != null) {
      await this.repository.remove(entity);
    }
  }

  /**
   * Entity를 생성합니다.
   * partial: PartialDeep<Entity>
   */
  create(partial: PartialDeep<Entity>) {
    return this.repository.save(new (this.repository.target as EntityClass<Entity>)(partial));
  }

  /**
   * 해당 ID를 가진 Entity를 수정합니다.
   * id: Entity ID
   * partial: PartialDeep<Entity>
   */
  async update(id: number, partial: PartialDeep<Entity>) {
    const existing = await this.get(id);

    return this.repository.save(
      new (this.repository.target as EntityClass<Entity>)({
        ...existing,
        ...partial,
      })
    );
  }
}

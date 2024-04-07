import { FindOptionsWhere, Repository } from '@awesome-dev/server-typeorm';
import { HttpStatus } from '@nestjs/common';

import { BaseIdEntity } from './entities';
import { BaseException } from './exceptions';

/**
 * BaseRepository는 TypeORM의 Repository를 상속받아 BaseIdEntity를 사용하는 Repository의 기본 메서드를 제공합니다.
 */
export abstract class BaseRepository<Entity extends BaseIdEntity> extends Repository<Entity> {
  protected isEntity(obj: unknown): obj is Entity {
    return obj !== undefined && (obj as Entity).id !== undefined;
  }

  /**
   * 해당 ID를 가진 Entity를 가져옵니다.
   * id: Entity ID
   * relations: 연결된 Entity를 가져올 때 사용할 Relation
   * 해당 ID를 가진 Entity가 존재하면 Entity, 존재하지 않을 때는 MODEL_NOT_FOUND 예외를 발생시킵니다.
   */
  async get(id: number, relations: string[] = []): Promise<Entity | null> {
    return await this.findOne({
      where: { id } as FindOptionsWhere<Entity>,
      relations,
    })
      .then(entity => {
        if (!this.isEntity(entity)) {
          throw new BaseException({
            code: 'MODEL_NOT_FOUND',
            message: '요청된 ID의 데이터가 존재하지 않습니다',
            status: HttpStatus.NOT_FOUND,
          });
        }

        return entity;
      })
      .catch(error => Promise.reject(error));
  }

  /**
   * 해당 ID들을 가진 Entity가 특정 사용자에게 속하는지 확인합니다.
   * ids: Entity ID 배열
   * userId: 사용자 ID
   * 해당 ID들이 모두 특정 사용자에게 속하면 true, 아니면 false
   */
  async checkBelongsTo(ids: number[], userId: number): Promise<boolean> {
    const result = await this.createQueryBuilder()
      .select('1')
      .where('id IN(:ids)', { ids })
      .andWhere('userId = :userId', { userId })
      .take(ids.length)
      .limit(ids.length)
      .execute();
    return result?.length === ids.length;
  }
}

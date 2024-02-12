import { HttpStatus } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';

import { BaseIdEntity } from './entities';
import { BaseException } from './exceptions';

export abstract class BaseRepository<Entity extends BaseIdEntity> extends Repository<Entity> {
  protected isEntity(obj: unknown): obj is Entity {
    return obj !== undefined && (obj as Entity).id !== undefined;
  }

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

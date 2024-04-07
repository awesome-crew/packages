import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity as TypeORMBaseEntity,
} from '@awesome-dev/server-typeorm';
import { PartialDeep } from '@awesome-dev/typings';
import { ApiProperty } from '@nestjs/swagger';

/**
 * BaseIdEntity를 상속받아 Entity를 생성할 수 있습니다.
 * id, createdAt, updatedAt를 기본으로 가지고 있습니다.
 */
export class BaseIdEntity extends TypeORMBaseEntity {
  constructor(attrs?: PartialDeep<BaseIdEntity>) {
    super();
    if (!attrs) {
      return;
    }

    Object.assign(this, attrs);
  }

  @ApiProperty({ description: '고유식별자 (auto-incremental integer)' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: '생성시점' })
  @CreateDateColumn()
  createdAt: Date;
  @ApiProperty({ description: '수정시점' })
  @UpdateDateColumn()
  updatedAt: Date;
}

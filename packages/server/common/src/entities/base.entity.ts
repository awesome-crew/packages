import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity as TypeORMBaseEntity,
} from '@awesome-dev/server-typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class BaseIdEntity extends TypeORMBaseEntity {
  constructor(attrs?: Partial<BaseIdEntity>) {
    super();
    if (!attrs) {
      return;
    }

    Object.assign(this, attrs);
  }

  @ApiProperty({ name: 'ID', description: '고유식별자 (auto-incremental integer)' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ name: '생성시점' })
  @CreateDateColumn()
  createdAt: Date;
  @ApiProperty({ name: '수정시점' })
  @UpdateDateColumn()
  updatedAt: Date;
}

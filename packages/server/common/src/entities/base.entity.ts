import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity as TypeORMBaseEntity,
} from "typeorm";

export class BaseIdEntity extends TypeORMBaseEntity {
  constructor(attrs?: Partial<BaseIdEntity>) {
    super();
    if (!attrs) {
      return;
    }

    Object.assign(this, attrs);
  }

  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

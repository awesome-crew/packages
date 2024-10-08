import type { FindManyOptions, FindOptionsWhere } from '@awesome-dev/server-typeorm';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { parseFilter } from '../helpers';

export const ListOptionsQuery = <Entity>(options?: {
  excludes?: string[];
  acceptRelations?: boolean;
}) =>
  createParamDecorator(
    async (_data: unknown, ctx: ExecutionContext): Promise<ListOptions<Entity>> => {
      const { query } = ctx.switchToHttp().getRequest();
      const { offset, limit, order, relations = [], ...where } = query;

      const { excludes } = options ?? {};
      if (excludes?.length) {
        for (const fieldName of excludes) {
          delete where[fieldName];
        }
      }

      const parsedResult = parseFilter(where);
      const _relations = parsedResult.relations.concat(options?.acceptRelations ? relations : []);

      return new ListOptions<Entity>()
        .where(parsedResult.where)
        .page({
          offset,
          limit,
        })
        .order(order)
        .relation(_relations as Relation<Entity>[]);
    }
  )();

export type Relation<Entity> = keyof Entity | `${string & keyof Entity}.${string}`;

export class ListOptions<Entity> {
  private _where?: Record<string, unknown>;
  private _page?: {
    offset: number;
    limit?: number;
  };
  private _order?: { field: keyof Entity; direction: 'ASC' | 'DESC' };
  private _relations?: Relation<Entity>[];

  static from<Entity = unknown>(existing?: ListOptions<Entity>) {
    return existing != null ? existing.copy() : new ListOptions<Entity>();
  }

  static for(input: Record<string, unknown>) {
    return new ListOptions().where(input);
  }

  constructor(input?: Partial<Entity>) {
    if (input != null) {
      this.where(input);
    }
  }

  where(input: Record<string, unknown>) {
    if (input && Object.keys(input).length > 0) {
      this._where = {
        ...this._where,
        ...input,
      };
    }
    return this;
  }
  page(input: { offset: number; limit: number }) {
    if (input && input.offset != null) {
      this._page = {
        offset: input.offset,
        limit: input.limit ?? 20,
      };
    }
    return this;
  }
  order(input: `${'' | '-'}${string & keyof Entity}`) {
    if (input) {
      this._order = {
        field: input.replace('-', '') as keyof Entity,
        direction: input[0] === '-' ? 'DESC' : 'ASC',
      };
    }
    return this;
  }
  relation(input: Relation<Entity> | Relation<Entity>[]) {
    if (input) {
      this._relations = (this._relations ?? []).concat(input);
    }
    return this;
  }

  copy(): ListOptions<Entity> {
    const res = new ListOptions<Entity>();

    if (this._where != null) {
      res.where(this._where);
    }

    if (this._page != null) {
      res.page({ limit: 20, ...this._page });
    }

    if (this._order != null) {
      res.order(
        `${this._order.direction === 'DESC' ? '-' : ''}${this._order.field.toString()}` as any
      );
    }

    if (this._relations != null) {
      res.relation(this._relations);
    }

    return res;
  }

  toFindOptions(): FindManyOptions<Entity> {
    return {
      where: this._where as FindOptionsWhere<Entity>,
      ...(this._page && {
        skip: this._page.offset,
        take: this._page.limit,
      }),
      order: {
        // @FIXME: id 없는 entity면 에러남
        [this._order?.field ?? 'id']: this._order?.direction ?? 'DESC',
        // @TODO: any 없애기
      } as any,
      relations: [...new Set(this._relations as string[])],
    };
  }
}

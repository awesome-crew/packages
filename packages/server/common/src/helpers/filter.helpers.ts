import {
  In,
  Between,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
  IsNull,
  Not,
  Like,
} from '@awesome-dev/server-typeorm';
import { UnknownRecord } from '@awesome-dev/typings';
import { BadRequestException } from '@nestjs/common';

const { isArray } = Array;

const parseValue = (value: unknown) => {
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') {
      return true;
    }
    if (value.toLowerCase() === 'false') {
      return false;
    }
  }

  return value;
};

export const parseFilter = (filter: unknown) => {
  const relations: string[] = [];

  const where: UnknownRecord = Object.keys(filter ?? {}).reduce((acc, key) => {
    const value = (filter as any)[key];
    if (value === undefined) {
      return acc;
    }

    // {key1}.{key2} 형태의 필터링을 위한 로직 추가
    const regex = /(.+?)\.(.+)/;
    if (regex.test(key)) {
      const [key1, rest] = key.match(regex)!.slice(1);

      const key1Result = parseFilter({ [rest]: value });

      relations.push(key1, ...key1Result.relations.map(x => `${key1}.${x}`));

      return {
        ...acc,
        [key1]: key1Result.where,
      };
    }

    if (/Include$/.test(key)) {
      return {
        ...acc,
        [key.replace(/Include$/, '')]: Like(`%${value}%`),
      };
    }
    if (/Like$/.test(key)) {
      return {
        ...acc,
        [key.replace(/Like$/, '')]: Like(`${value}%`),
      };
    }
    if (/NotIn$/.test(key) && isArray(value)) {
      return {
        ...acc,
        [key.replace(/NotIn$/, '')]: Not(In(value)),
      };
    }
    if (/In$/.test(key) && isArray(value)) {
      return {
        ...acc,
        [key.replace(/In$/, '')]: In(value),
      };
    }
    if (/Between$/.test(key) && isArray(value)) {
      const [from, to] = value.sort((a, b) => {
        return a < b ? -1 : a > b ? 1 : 0;
      });
      return {
        ...acc,
        [key.replace(/Between$/, '')]: Between(from, to),
      };
    }
    if (/Mt$/.test(key)) {
      return {
        ...acc,
        [key.replace(/Mt$/, '')]: MoreThan(value),
      };
    }
    if (/Mte$/.test(key)) {
      return {
        ...acc,
        [key.replace(/Mte$/, '')]: MoreThanOrEqual(value),
      };
    }
    if (/Lt$/.test(key)) {
      return {
        ...acc,
        [key.replace(/Lt$/, '')]: LessThan(value),
      };
    }
    if (/Lte$/.test(key)) {
      return {
        ...acc,
        [key.replace(/Lte$/, '')]: LessThanOrEqual(value),
      };
    }
    if (/IsNull$/.test(key)) {
      return {
        ...acc,
        [key.replace(/IsNull$/, '')]: value ? IsNull() : Not(IsNull()),
      };
    }
    if (/Not$/.test(key)) {
      return {
        ...acc,
        [key.replace(/Not$/, '')]: Not(value),
      };
    }

    return { ...acc, [key]: parseValue(value) };
  }, {});

  return {
    where,
    relations,
  };
};

export const parsePaginator = (offset: number, limit: number) => {
  if (offset === undefined && limit === undefined) {
    return null;
  }

  if (limit === undefined || offset === undefined) {
    throw new BadRequestException('offset과 limit 중 하나의 값이 존재하지 않습니다.');
  }
  return { skip: Number(offset), take: Number(limit) };
};

export const parseSorter = (order: string) => {
  if (order === undefined) {
    return null;
  }
  const [field, direction] = order.split(' ');
  if (direction !== 'ASC' && direction !== 'DESC') {
    throw new BadRequestException('order값은 ASC 또는 DESC를 포함해야합니다');
  }

  return {
    [field]: direction as 'ASC' | 'DESC',
  };
};

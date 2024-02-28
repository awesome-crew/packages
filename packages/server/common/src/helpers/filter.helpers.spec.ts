import { describe, expect, it } from '@jest/globals';
import { faker } from '@faker-js/faker';
import {
  Between,
  In,
  IsNull,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from '@awesome-dev/server-typeorm';

import { parseFilter } from './filter.helpers';

describe('filter helpers', () => {
  describe('parseFilter', () => {
    it('should return {} when filter is falsy or empty', () => {
      expect(parseFilter(null).where).toEqual({});
      expect(parseFilter(undefined).where).toEqual({});
      expect(parseFilter({}).where).toEqual({});
    });

    it('should return exact match filter', () => {
      const strs = [faker.lorem.text(), faker.lorem.text(), faker.lorem.text()];
      expect(parseFilter({ id: 1 }).where).toEqual({ id: 1 });
      expect(parseFilter({ id: 1, nameIn: strs }).where).toEqual({
        id: 1,
        name: In(strs),
      });
    });

    it('should parse Like', () => {
      const str = faker.lorem.text();

      expect(parseFilter({ nameLike: str }).where).toEqual({ name: Like(`${str}%`) });
    });

    it('should parse In', () => {
      const strs = [faker.lorem.text(), faker.lorem.text(), faker.lorem.text()];
      const nums = [faker.number.int(), faker.number.int(), faker.number.int()];

      expect(parseFilter({ nameIn: strs }).where).toEqual({
        name: In(strs),
      });
      expect(parseFilter({ ageIn: nums }).where).toEqual({
        age: In(nums),
      });
    });

    it('should parse Between', () => {
      const [from, to] = [faker.number.int(), faker.number.int()].sort((a, b) => a - b);

      const inputs = [
        [from, to],
        [new Date(from), new Date(to)],
      ];

      for (const input of inputs) {
        expect(parseFilter({ nameBetween: input }).where).toEqual({
          name: Between(input[0], input[1]),
        });
      }
    });

    it('should parse Mt', () => {
      const num = faker.number.int();

      expect(parseFilter({ ageMt: num }).where).toEqual({
        age: MoreThan(num),
      });
    });

    it('should parse Mte', () => {
      const num = faker.number.int();

      expect(parseFilter({ ageMte: num }).where).toEqual({
        age: MoreThanOrEqual(num),
      });
    });

    it('should parse Lte', () => {
      const num = faker.number.int();

      expect(parseFilter({ ageLte: num }).where).toEqual({
        age: LessThanOrEqual(num),
      });
    });

    it('should parse IsNull', () => {
      [true, false].forEach(value => {
        expect(parseFilter({ titleIsNull: value }).where).toEqual({
          title: value ? IsNull() : Not(IsNull()),
        });
      });
    });

    it('중첩된 경우도 잘 처리한다', () => {
      const given = { ['author.ageMte']: faker.number.int() };

      const { where, relations } = parseFilter(given);

      expect(where).toEqual({
        author: { age: MoreThanOrEqual(given['author.ageMte']) },
      });
      expect(relations).toEqual(['author']);
    });
  });

  it('2중 중첩도 잘 처리한다', () => {
    const given = { ['author.profile.name']: '최수민' };

    const { where, relations } = parseFilter(given);

    expect(where).toEqual({
      author: { profile: { name: '최수민' } },
    });
    expect(relations).toEqual(['author', 'author.profile']);
  });
});

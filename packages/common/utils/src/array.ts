import { isEmptyArrayOrNil } from './validators';

export function shiftUntil<Item>(arr: Item[], predicate: (item: Item) => boolean) {
  const result: Array<Item | null> = [];

  while (arr.length > 0 && predicate(arr[0])) {
    result.push(arr.shift() ?? null);
  }

  return result;
}

export function popUntil<Item>(arr: Item[], predicate: (item: Item) => boolean) {
  const result: Array<Item | null> = [];

  while (arr.length > 0 && predicate(arr[arr.length - 1])) {
    result.push(arr.pop() ?? null);
  }

  return result;
}

interface ArrayToReadableTextOptions<Item> {
  empty?: string;
  one?: (oneValue: Item, arr: Item[]) => string;
  others?: (
    arr: Item[],
    option: { oneValue: Item; oneText: string; restItemCount: number }
  ) => string;
}

export function arrayToReadableText<Item extends string>(
  item: Item[] | Item | undefined,
  options: ArrayToReadableTextOptions<Item> = {}
) {
  const {
    empty = '',
    one = x => `${x}`,
    others = (item, { oneText }) => `${oneText} 외 ${item.length - 1}개`,
  } = options;

  if (isEmptyArrayOrNil(item)) {
    return empty;
  }

  if (typeof item === 'string') {
    return item;
  }

  if (item.length === 1) {
    return one(item[0], item);
  }

  return others(item, {
    oneValue: item[0],
    oneText: one(item[0], item),
    restItemCount: item.length - 1,
  });
}

export function arrayOf<ValueType>(
  count: number,
  valueAs: (index: number) => ValueType = x => x as unknown as ValueType
) {
  return [...new Array(count).keys()].map(index => valueAs(index));
}

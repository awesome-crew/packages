/**
 * min ~ max 사이의 랜덤 정수를 반환합니다.
 * min: 최소값
 * max: 최대값
 */
export const getRandomIntBetween = (min: number, max: number): number => {
  const num = Math.random() * (max - min) + min;
  return Math.round(Math.max(min, Math.min(num, max)));
};

/**
 * 배열을 무작위로 섞어 반환합니다.
 */
export const shuffleArray = <T = unknown>(arr: T[]): T[] => arr.sort(() => Math.random() - 0.5);

/**
 * 배열에서 무작위 요소를 반환합니다.
 */
export const getRandomEle = <T = unknown>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

type UnknownEnum = Record<string, unknown>;

/**
 * enum의 값들을 배열로 반환합니다.
 */
export const getEnumValues = (input: UnknownEnum) =>
  Object.values(input).filter(value => typeof value === 'string');

/** get random value of given enum. except given excludes array */
export const getRandomEnumValue = <T extends UnknownEnum>(input: T, excludes: (keyof T)[] = []) => {
  const valuesExcept = getEnumValues(input).filter(
    value => excludes.indexOf(value as keyof T) === -1
  );
  return getRandomEle(valuesExcept);
};

/**
 * 랜덤한 대소문자와 숫자를 포함한 6자리문자열을 반환합니다.
 */
export const getRandomString = (length = 6): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
const s8 = () => s4() + s4();
const s12 = () => s8() + s4();

/** return random uuid */
export const getRandomUuid = () => {
  return [s8(), s4(), s4(), s4(), s12()].join('-');
};

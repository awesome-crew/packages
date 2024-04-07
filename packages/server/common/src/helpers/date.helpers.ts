import { format, utcToZonedTime } from 'date-fns-tz';

/**
 * 서울 시간대로 날짜를 포맷합니다.
 */
export const formatSeoulDate = (pattern: string, date = new Date()): string => {
  const timeZone = 'Asia/Seoul';
  const zonedDate = utcToZonedTime(date, timeZone);
  // zonedDate could be used to initialize a date picker or display the formatted local date/time

  // Set the output to "1.9.2018 18:01:36.386 GMT+02:00 (CEST)"
  return format(zonedDate, pattern, { timeZone });
};

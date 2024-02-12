import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

export const IS_MONTH_STRING = 'isMonthString';
const PATTERN = /^\d{4}-\d{2}$/;

export function isMonthString(value: unknown): boolean {
  return typeof value === 'string' && PATTERN.test(value);
}

/**
 * Check if the string is a month-string
 * (format is '####-##').
 * If not, returns false.
 */
export function IsMonthString(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_MONTH_STRING,
      validator: {
        validate: (value): boolean => isMonthString(value),
        defaultMessage: buildMessage(
          eachPrefix => eachPrefix + "$property must be a month string ('####-##')",
          validationOptions
        ),
      },
    },
    validationOptions
  );
}

import { type InferEnum, createEnum } from '@awesome-dev/enum';

export const ButtonType = createEnum(['default', 'primary', 'secondary', 'danger']);
export type ButtonType = InferEnum<typeof ButtonType>;

export const ButtonSize = createEnum(['small', 'default', 'large', 'xlarge']);
export type ButtonSize = InferEnum<typeof ButtonSize>;

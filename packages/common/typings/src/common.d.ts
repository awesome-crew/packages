export type ValueOf<T> = T[keyof T];

export type Nil = null | undefined;

export type Nullable<T> = T | null;

export type Nilable<T> = Nullable<T> | undefined;

export type StringKeyOf<T> = Extract<keyof T, string>;

export type ArrayElementOf<ArrayType extends readonly unknown[]> = ArrayType[number];

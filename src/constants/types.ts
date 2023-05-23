import { JSX } from "preact";

export type Hint = {
  style: JSX.CSSProperties;
  content: string;
};

export type Shift<T extends any[]> = T extends [infer _, ...infer Rest]
  ? Rest
  : never;

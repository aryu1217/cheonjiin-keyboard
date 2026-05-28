// index.d.ts
import * as React from "react";

export type CheonjiinKeyboardMode =
  | "hangul"
  | "english"
  | "number"
  | "symbol";

export interface CheonjiinKeyboardProps {
  onChange?: (value: string) => void;
  customKeys?: CheonjiinKeyboardCustomKeys;
  customStyle?: CheonjiinKeyboardCustomStyle;
  className?: string;
  style?: React.CSSProperties;
}

export type CheonjiinKeyboardCustomKey = {
  value: string;
  label?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
};

export type CheonjiinKeyboardCustomKeys = {
  common?: {
    row1col1?: CheonjiinKeyboardCustomKey;
  };
  hangul?: {
    row3col5?: CheonjiinKeyboardCustomKey;
  };
  english?: {
    row2col5?: CheonjiinKeyboardCustomKey;
    row4col2?: CheonjiinKeyboardCustomKey;
    row4col3?: CheonjiinKeyboardCustomKey;
  };
  number?: {
    row2col5?: CheonjiinKeyboardCustomKey;
    row3col5?: CheonjiinKeyboardCustomKey;
  };
};

export type CheonjiinKeyboardCustomStyle = Partial<
  Record<
    | "keyboard-bg"
    | "keyboard-padding"
    | "keyboard-margin"
    | "keyboard-border"
    | "keyboard-radius"
    | "grid-gap"
    | "key-bg"
    | "key-color"
    | "key-border"
    | "key-radius"
    | "key-height"
    | "key-font-size"
    | "key-active-bg",
    string | number
  >
>;

export interface CheonjiinKeyboardComponent
  extends React.FC<CheonjiinKeyboardProps> {}

declare const CheonjiinKeyboard: CheonjiinKeyboardComponent;

export { CheonjiinKeyboard };
export default CheonjiinKeyboard;

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
    | "keyboard-margin-top"
    | "grid-gap"
    | "key-bg"
    | "key-color"
    | "key-border-color"
    | "key-radius"
    | "key-height"
    | "key-font-size"
    | "key-active-bg"
    | "function-bg"
    | "function-color"
    | "enter-bg"
    | "enter-color"
    | "space-bg"
    | "space-color"
    | "empty-bg"
    | "empty-border-color"
    | "shift-on-bg"
    | "hangul-bg"
    | "hangul-color"
    | "hangul-border-color"
    | "english-bg"
    | "english-color"
    | "english-border-color"
    | "number-bg"
    | "number-color"
    | "number-border-color"
    | "symbol-bg"
    | "symbol-color"
    | "symbol-border-color",
    string | number
  >
>;

export interface CheonjiinKeyboardComponent
  extends React.FC<CheonjiinKeyboardProps> {}

declare const CheonjiinKeyboard: CheonjiinKeyboardComponent;

export { CheonjiinKeyboard };
export default CheonjiinKeyboard;

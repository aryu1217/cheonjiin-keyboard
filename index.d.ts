// index.d.ts
import * as React from "react";

export type CheonjiinKeyboardMode =
  | "hangul"
  | "english"
  | "number"
  | "symbol";

export interface CheonjiinKeyboardProps {
  onChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface CheonjiinKeyboardKeyProps {
  value: string;
  children?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

type CheonjiinKeyboardSlotChildren =
  | React.ReactElement<CheonjiinKeyboardKeyProps>
  | React.ReactElement<CheonjiinKeyboardKeyProps>[];

export type CheonjiinKeyboardSlotProps =
  | {
      mode?: undefined;
      name: "controlTop";
      children: CheonjiinKeyboardSlotChildren;
    }
  | {
      mode: "hangul";
      name: "controlTop" | "mainExtra";
      children: CheonjiinKeyboardSlotChildren;
    }
  | {
      mode: "english";
      name: "controlTop" | "topRight" | "bottomLeft" | "bottomMiddle";
      children: CheonjiinKeyboardSlotChildren;
    }
  | {
      mode: "number";
      name: "controlTop" | "rightTop" | "rightMiddle";
      children: CheonjiinKeyboardSlotChildren;
    }
  | {
      mode: "symbol";
      name: "controlTop";
      children: CheonjiinKeyboardSlotChildren;
    };

export interface CheonjiinKeyboardComponent
  extends React.FC<CheonjiinKeyboardProps> {
  Slot: React.FC<CheonjiinKeyboardSlotProps>;
  Key: React.FC<CheonjiinKeyboardKeyProps>;
}

declare const CheonjiinKeyboard: CheonjiinKeyboardComponent;

export { CheonjiinKeyboard };
export default CheonjiinKeyboard;

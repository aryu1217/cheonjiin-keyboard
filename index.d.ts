// index.d.ts
import * as React from "react";

export interface CheonjiinKeyboardProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

declare const CheonjiinKeyboard: React.FC<CheonjiinKeyboardProps>;

export default CheonjiinKeyboard;

import { createContext, useContext } from "react";

export type KeyboardMode = "hangul" | "english" | "number" | "symbol";

export type KeyboardViewContextValue = {
  mode: KeyboardMode;
  isUpper: boolean;
  goHangulMode: () => void;
  goEnglishMode: () => void;
  goNumberMode: () => void;
  goSymbolMode: () => void;
  toggleShift: () => void;
};

export const KeyboardViewContext =
  createContext<KeyboardViewContextValue | null>(null);

// 키보드 UI 내부에서 현재 화면 모드와 모드 전환 액션을 꺼내기 위한 hook입니다.
export function useKeyboardViewContext() {
  const context = useContext(KeyboardViewContext);

  if (!context) {
    throw new Error("KeyboardView 내부에서만 사용할 수 있습니다.");
  }

  return context;
}

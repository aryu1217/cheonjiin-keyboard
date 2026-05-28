import { createContext, useContext, type ReactNode } from "react";
import useCheonjiinInput from "./hooks/useCheonjiinInput";

type KeyboardInputContextValue = {
  text: string;
  pressVowelStroke: (stroke: string) => void;
  pressConsonantCycle: (cycle: string[]) => void;
  insertChar: (char: string) => void;
  insertCharCycle: (cycle: string[]) => void;
  backspace: () => void;
  resetComposition: () => void;
  updateLastJamo: (updater: string | ((value: string) => string)) => void;
};

type KeyboardInputProviderProps = {
  onChange?: (value: string) => void;
  children: ReactNode;
};

const KeyboardInputContext = createContext<KeyboardInputContextValue | null>(
  null,
);

// 천지인 입력 조합 상태와 입력 액션만 제공하는 Provider입니다.
// 빈 슬롯 커스텀이나 화면 모드 선택은 각각 별도 Provider/View가 책임집니다.
export default function KeyboardInputProvider({
  onChange,
  children,
}: KeyboardInputProviderProps) {
  const input = useCheonjiinInput({ onChange });

  const value: KeyboardInputContextValue = {
    text: input.text,
    pressVowelStroke: input.pressVowelStroke,
    pressConsonantCycle: input.pressConsonantCycle,
    insertChar: input.insertChar,
    insertCharCycle: input.insertCharCycle,
    backspace: input.backspace,
    resetComposition: input.resetComposition,
    updateLastJamo: input.updateLastJamo,
  };

  return (
    <KeyboardInputContext.Provider value={value}>
      {children}
    </KeyboardInputContext.Provider>
  );
}

export function useKeyboardInputContext() {
  const context = useContext(KeyboardInputContext);

  if (!context) {
    throw new Error("KeyboardInputProvider 내부에서만 사용할 수 있습니다.");
  }

  return context;
}

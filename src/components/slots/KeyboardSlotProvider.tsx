import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  createKeyboardSlots,
  getSlotsForMode as resolveSlotsForMode,
} from "./keyboardSlots";

type KeyboardMode = "hangul" | "english" | "number" | "symbol";

type KeyboardSlotContextValue = {
  getSlotsForMode: (
    mode: KeyboardMode,
  ) => ReturnType<typeof resolveSlotsForMode>;
};

type KeyboardSlotProviderProps = {
  customKeys?: Parameters<typeof createKeyboardSlots>[0];
  children: ReactNode;
};

const KeyboardSlotContext = createContext<KeyboardSlotContextValue | null>(
  null,
);

// 사용자가 전달한 customKeys 설정을 정규화하고, 현재 모드에서 사용할 슬롯만 제공합니다.
export default function KeyboardSlotProvider({
  customKeys,
  children,
}: KeyboardSlotProviderProps) {
  const slots = useMemo(
    () => createKeyboardSlots(customKeys),
    [customKeys],
  );

  const value = useMemo(
    () => ({
      getSlotsForMode: (mode: KeyboardMode) =>
        resolveSlotsForMode(slots, mode),
    }),
    [slots],
  );

  return (
    <KeyboardSlotContext.Provider value={value}>
      {children}
    </KeyboardSlotContext.Provider>
  );
}

export function useKeyboardSlotContext() {
  const context = useContext(KeyboardSlotContext);

  if (!context) {
    throw new Error("KeyboardSlotProvider 내부에서만 사용할 수 있습니다.");
  }

  return context;
}

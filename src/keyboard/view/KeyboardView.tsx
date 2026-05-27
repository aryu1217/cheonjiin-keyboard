import { useState } from "react";
import EnglishKeyboard from "../layouts/EnglishKeyboard";
import HangulKeyboard from "../layouts/HangulKeyboard";
import { useKeyboardInputContext } from "../input/KeyboardInputProvider";
import {
  KeyboardViewContext,
  type KeyboardMode,
  type KeyboardViewContextValue,
} from "./KeyboardViewContext";
import NumberKeyboard from "../layouts/NumberKeyboard";
import SymbolKeyboard from "../layouts/SymbolKeyboard";

// 현재 표시할 키보드 모드와 영문 shift 상태를 관리하는 화면 레이어입니다.
// 입력 조합 상태는 KeyboardInputProvider가 갖고, 이 컴포넌트는 현재 mode에 맞는 UI까지 선택합니다.
export function KeyboardView() {
  const [mode, setMode] = useState<KeyboardMode>("hangul");
  const [isUpper, setIsUpper] = useState(false);
  const { resetComposition } = useKeyboardInputContext();

  const goHangulMode = () => {
    setMode("hangul");
    setIsUpper(false);
    resetComposition();
  };

  const goEnglishMode = () => {
    setMode("english");
    setIsUpper(false);
    resetComposition();
  };

  const goNumberMode = () => {
    setMode("number");
    resetComposition();
  };

  const goSymbolMode = () => {
    setMode("symbol");
    resetComposition();
  };

  const toggleShift = () => {
    setIsUpper((prev) => !prev);
  };

  const value: KeyboardViewContextValue = {
    mode,
    isUpper,
    goHangulMode,
    goEnglishMode,
    goNumberMode,
    goSymbolMode,
    toggleShift,
  };

  return (
    <KeyboardViewContext.Provider value={value}>
      {mode === "hangul" && <HangulKeyboard />}
      {mode === "english" && <EnglishKeyboard />}
      {mode === "number" && <NumberKeyboard />}
      {mode === "symbol" && <SymbolKeyboard />}
    </KeyboardViewContext.Provider>
  );
}

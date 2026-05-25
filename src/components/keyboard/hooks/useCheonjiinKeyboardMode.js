import { useState } from "react";

// 키보드 모드와 영문 shift 상태를 관리하는 hook입니다.
// 실제 입력 state는 useCheonjiinInput이 소유하므로, 이 hook은 필요한 액션만 주입받습니다.
export default function useCheonjiinKeyboardMode({
  resetComposition,
  insertCharCycle,
  updateLastJamo,
}) {
  const [mode, setMode] = useState("hangul");
  const [isUpper, setIsUpper] = useState(false);

  // 한글/영문 전환은 shift 상태까지 초기화하고, 숫자/기호 전환은 현재 조합만 끊습니다.
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

  // 영문 cycle 입력 후 shift가 켜져 있으면 마지막 입력 문자만 대문자로 보정합니다.
  const handleAlphaCycle = (chars) => {
    insertCharCycle(chars);

    if (isUpper) {
      updateLastJamo((lastJamo) => lastJamo.toUpperCase());
    }
  };

  return {
    mode,
    isUpper,
    goHangulMode,
    goEnglishMode,
    goNumberMode,
    goSymbolMode,
    toggleShift,
    handleAlphaCycle,
  };
}

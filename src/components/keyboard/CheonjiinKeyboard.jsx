import { useEffect, useState } from "react";
import "./CheonjiinKeyboard.css";
import {
  createInitialState,
  pressConsonantCycle,
  pressVowelStroke,
  backspace,
  getText,
  insertChar,
  insertCharCycle,
} from "../../utils/cheonjiinComposer";
import HangulKeyboard from "./HangulKeyboard";
import EnglishKeyboard from "./EnglishKeyboard";
import NumberKeyboard from "./NumberKeyboard";
import SymbolKeyboard from "./SymbolKeyboard";
export default function CheonjiinKeyboard({ onChange }) {
  const [state, setState] = useState(() => createInitialState());
  const [mode, setMode] = useState("hangul");
  const [isUpper, setIsUpper] = useState(false);
  const text = getText(state);

  useEffect(() => {
    if (onChange) onChange(text);
  }, [text, onChange]);

  const resetComposition = (prev) => ({
    ...prev,
    vowelStrokes: [],
    currentVowelIndex: -1,
  });

  // 공통 핸들러들 ---------------------------------------------------
  const handleConsonantGroup = (cycle) => {
    setState((prev) => pressConsonantCycle(prev, cycle));
  };
  const handleStroke = (stroke) => {
    setState((prev) => pressVowelStroke(prev, stroke));
  };
  const handleBackspace = () => {
    setState((prev) => backspace(prev));
  };
  const handleInsertChar = (ch) => {
    setState((prev) => insertChar(prev, ch));
  };
  const handleInsertCharCycle = (cycle) => {
    setState((prev) => insertCharCycle(prev, cycle));
  };

  // 영어 알파벳(소문자 배열 기준) + Shift 적용
  const handleAlphaCycle = (chars) => {
    setState((prev) => {
      const after = insertCharCycle(prev, chars);
      if (!isUpper) return after;
      const jamo = after.jamo.slice();
      const last = jamo.length - 1;
      if (last >= 0) jamo[last] = jamo[last].toUpperCase();
      return { ...after, jamo };
    });
  };

  // 모드 전환 ------------------------------------------------------
  const goHangulMode = () => {
    setMode("hangul");
    setIsUpper(false);
    setState((prev) => resetComposition(prev));
  };

  const goEnglishMode = () => {
    setMode("english");
    setIsUpper(false);
    setState((prev) => resetComposition(prev));
  };

  const goNumberMode = () => {
    setMode("number");
    setState((prev) => resetComposition(prev));
  };

  const goSymbolMode = () => {
    setMode("symbol");
    setState((prev) => resetComposition(prev));
  };

  const toggleShift = () => {
    setIsUpper((prev) => !prev);
  };

  // 렌더링 ---------------------------------------------------------
  return (
    <div className="cheon-keyboard">
      {mode === "hangul" && (
        <HangulKeyboard
          onStroke={handleStroke}
          onConsonantGroup={handleConsonantGroup}
          onInsertChar={handleInsertChar}
          onInsertCharCycle={handleInsertCharCycle}
          onBackspace={handleBackspace}
          goEnglishMode={goEnglishMode}
          goNumberMode={goNumberMode}
          goSymbolMode={goSymbolMode}
        />
      )}
      {mode === "english" && (
        <EnglishKeyboard
          isUpper={isUpper}
          toggleShift={toggleShift}
          onAlphaCycle={handleAlphaCycle}
          onInsertChar={handleInsertChar}
          onInsertCharCycle={handleInsertCharCycle}
          onBackspace={handleBackspace}
          goHangulMode={goHangulMode}
        />
      )}
      {mode === "number" && (
        <NumberKeyboard
          onInsertChar={handleInsertChar}
          onBackspace={handleBackspace}
          goHangulMode={goHangulMode}
        />
      )}
      {mode === "symbol" && (
        <SymbolKeyboard
          onInsertChar={handleInsertChar}
          onBackspace={handleBackspace}
          goHangulMode={goHangulMode}
          goNumberMode={goNumberMode}
        />
      )}
    </div>
  );
}

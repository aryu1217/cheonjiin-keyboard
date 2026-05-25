import "./CheonjiinKeyboard.css";
import HangulKeyboard from "./HangulKeyboard";
import EnglishKeyboard from "./EnglishKeyboard";
import NumberKeyboard from "./NumberKeyboard";
import SymbolKeyboard from "./SymbolKeyboard";
import useCheonjiinInput from "./hooks/useCheonjiinInput";
import useCheonjiinKeyboardMode from "./hooks/useCheonjiinKeyboardMode";

// 키보드 최상위 조립 컴포넌트입니다.
// 입력/조합 상태와 모드 상태는 각각 전용 hook이 책임지고, 이 파일은 현재 모드에 맞는 UI만 선택합니다.
export default function CheonjiinKeyboard({ onChange }) {
  const input = useCheonjiinInput({ onChange });
  const keyboardMode = useCheonjiinKeyboardMode({
    resetComposition: input.resetComposition,
    insertCharCycle: input.insertCharCycle,
    updateLastJamo: input.updateLastJamo,
  });

  return (
    <div className="cheon-keyboard">
      {keyboardMode.mode === "hangul" && (
        <HangulKeyboard
          onStroke={input.pressVowelStroke}
          onConsonantGroup={input.pressConsonantCycle}
          onInsertChar={input.insertChar}
          onInsertCharCycle={input.insertCharCycle}
          onBackspace={input.backspace}
          goEnglishMode={keyboardMode.goEnglishMode}
          goNumberMode={keyboardMode.goNumberMode}
          goSymbolMode={keyboardMode.goSymbolMode}
        />
      )}
      {keyboardMode.mode === "english" && (
        <EnglishKeyboard
          isUpper={keyboardMode.isUpper}
          toggleShift={keyboardMode.toggleShift}
          onAlphaCycle={keyboardMode.handleAlphaCycle}
          onInsertChar={input.insertChar}
          onInsertCharCycle={input.insertCharCycle}
          onBackspace={input.backspace}
          goHangulMode={keyboardMode.goHangulMode}
          goNumberMode={keyboardMode.goNumberMode}
          goSymbolMode={keyboardMode.goSymbolMode}
        />
      )}
      {keyboardMode.mode === "number" && (
        <NumberKeyboard
          onInsertChar={input.insertChar}
          onBackspace={input.backspace}
          goHangulMode={keyboardMode.goHangulMode}
          goNumberMode={keyboardMode.goNumberMode}
          goSymbolMode={keyboardMode.goSymbolMode}
        />
      )}
      {keyboardMode.mode === "symbol" && (
        <SymbolKeyboard
          onInsertChar={input.insertChar}
          onInsertCharCycle={input.insertCharCycle}
          onBackspace={input.backspace}
          goHangulMode={keyboardMode.goHangulMode}
          goNumberMode={keyboardMode.goNumberMode}
          goSymbolMode={keyboardMode.goSymbolMode}
        />
      )}
    </div>
  );
}

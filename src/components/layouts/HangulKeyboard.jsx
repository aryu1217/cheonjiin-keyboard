import KeyboardControlKey from "./KeyboardControlKey";
import KeyboardSlotCell from "../slots/KeyboardSlotCell";
import { useKeyboardInputContext } from "../input/KeyboardInputProvider";
import { useKeyboardSlotContext } from "../slots/KeyboardSlotProvider";
import { useKeyboardViewContext } from "../view/KeyboardViewContext";

// 한글 천지인 키 배열을 렌더링하고, 입력/모드 액션은 Context에서 가져옵니다.
export default function HangulKeyboard() {
  const {
    pressVowelStroke,
    pressConsonantCycle,
    insertChar,
    insertCharCycle,
    backspace,
  } = useKeyboardInputContext();
  const { getSlotsForMode } = useKeyboardSlotContext();
  const { goEnglishMode, goNumberMode, goSymbolMode } =
    useKeyboardViewContext();
  const modeSlots = getSlotsForMode("hangul");

  return (
    <div className="cheon-grid" data-cji-mode="hangul">
      {/* 1행 : (빈칸) / ㅣ / · / ㅡ / ⌫ */}
      <KeyboardControlKey
        type="empty"
        mode="hangul"
        position="row1col1"
        slot={modeSlots.row1col1}
        onInsertChar={insertChar}
      />
      <button
        className="cheon-key cheon-key--stroke"
        onClick={() => pressVowelStroke("I")}
      >
        ㅣ
      </button>
      <button
        className="cheon-key cheon-key--stroke"
        onClick={() => pressVowelStroke("D")}
      >
        ·
      </button>
      <button
        className="cheon-key cheon-key--stroke"
        onClick={() => pressVowelStroke("H")}
      >
        ㅡ
      </button>
      <button className="cheon-key cheon-key--func" onClick={backspace}>
        ⌫
      </button>

      {/* 2행 : 123 / ㄱㅋ / ㄴㄹ / ㄷㅌ / ?! */}
      <KeyboardControlKey
        type="number"
        mode="hangul"
        onClick={goNumberMode}
      />
      <button
        className="cheon-key"
        onClick={() => pressConsonantCycle(["ㄱ", "ㅋ", "ㄲ"])}
      >
        ㄱㅋ
      </button>
      <button
        className="cheon-key"
        onClick={() => pressConsonantCycle(["ㄴ", "ㄹ"])}
      >
        ㄴㄹ
      </button>
      <button
        className="cheon-key"
        onClick={() => pressConsonantCycle(["ㄷ", "ㅌ", "ㄸ"])}
      >
        ㄷㅌ
      </button>
      <button
        className="cheon-key"
        onClick={() => insertCharCycle(["?", "!"])}
      >
        ?!
      </button>

      {/* 3행 : 기호 / ㅂㅍ / ㅅㅎ / ㅈㅊ / (빈칸) */}
      <KeyboardControlKey
        type="symbol"
        mode="hangul"
        onClick={goSymbolMode}
      />
      <button
        className="cheon-key"
        onClick={() => pressConsonantCycle(["ㅂ", "ㅍ", "ㅃ"])}
      >
        ㅂㅍ
      </button>
      <button
        className="cheon-key"
        onClick={() => pressConsonantCycle(["ㅅ", "ㅎ", "ㅆ"])}
      >
        ㅅㅎ
      </button>
      <button
        className="cheon-key"
        onClick={() => pressConsonantCycle(["ㅈ", "ㅊ", "ㅉ"])}
      >
        ㅈㅊ
      </button>
      <KeyboardSlotCell
        mode="hangul"
        position="row3col5"
        slot={modeSlots.row3col5}
        onInsertChar={insertChar}
      />

      {/* 4행 : 영타/한 / . , / ㅇㅁ / SPACE / ↵ */}
      <KeyboardControlKey
        type="language"
        mode="hangul"
        onClick={goEnglishMode}
      />
      <button
        className="cheon-key"
        onClick={() => insertCharCycle([".", ","])}
      >
        . ,
      </button>
      <button
        className="cheon-key"
        onClick={() => pressConsonantCycle(["ㅇ", "ㅁ"])}
      >
        ㅇㅁ
      </button>
      <button
        className="cheon-key cheon-key--space"
        onClick={() => insertChar(" ")}
      >
        SPACE
      </button>
      <button
        className="cheon-key cheon-key--enter"
        onClick={() => insertChar("\n")}
      >
        ↵
      </button>
    </div>
  );
}

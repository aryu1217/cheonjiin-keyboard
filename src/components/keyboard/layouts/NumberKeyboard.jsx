import KeyboardControlKey from "./KeyboardControlKey";
import KeyboardSlotCell from "../slots/KeyboardSlotCell";
import { useKeyboardInputContext } from "../input/KeyboardInputProvider";
import { useKeyboardSlotContext } from "../slots/KeyboardSlotProvider";
import { useKeyboardViewContext } from "../view/KeyboardViewContext";

// 숫자 키 배열을 렌더링하고, 실제 입력/모드 전환은 Context 액션에 위임합니다.
export default function NumberKeyboard() {
  const { insertChar, backspace } = useKeyboardInputContext();
  const { getSlotsForMode } = useKeyboardSlotContext();
  const { goHangulMode, goNumberMode, goSymbolMode } =
    useKeyboardViewContext();
  const modeSlots = getSlotsForMode("number");

  return (
    <div className="cheon-grid" data-cji-mode="number">
      {/* 1행: (빈칸) | 1 | 2 | 3 | ⌫ */}
      <KeyboardControlKey
        type="empty"
        mode="number"
        position="row1col1"
        slot={modeSlots.row1col1}
        onInsertChar={insertChar}
      />
      <button className="cheon-key" onClick={() => insertChar("1")}>
        1
      </button>
      <button className="cheon-key" onClick={() => insertChar("2")}>
        2
      </button>
      <button className="cheon-key" onClick={() => insertChar("3")}>
        3
      </button>
      <button className="cheon-key cheon-key--func" onClick={backspace}>
        ⌫
      </button>

      {/* 2행: 123 | 4 | 5 | 6 | (빈칸) */}
      <KeyboardControlKey
        type="number"
        mode="number"
        onClick={goNumberMode}
      />
      <button className="cheon-key" onClick={() => insertChar("4")}>
        4
      </button>
      <button className="cheon-key" onClick={() => insertChar("5")}>
        5
      </button>
      <button className="cheon-key" onClick={() => insertChar("6")}>
        6
      </button>
      <KeyboardSlotCell
        mode="number"
        position="row2col5"
        slot={modeSlots.row2col5}
        onInsertChar={insertChar}
      />

      {/* 3행: 기호 | 7 | 8 | 9 | (빈칸) */}
      <KeyboardControlKey
        type="symbol"
        mode="number"
        onClick={goSymbolMode}
      />
      <button className="cheon-key" onClick={() => insertChar("7")}>
        7
      </button>
      <button className="cheon-key" onClick={() => insertChar("8")}>
        8
      </button>
      <button className="cheon-key" onClick={() => insertChar("9")}>
        9
      </button>
      <KeyboardSlotCell
        mode="number"
        position="row3col5"
        slot={modeSlots.row3col5}
        onInsertChar={insertChar}
      />

      {/* 4행: 영타/한 | . | 0 | SPACE | ↵ */}
      <KeyboardControlKey
        type="language"
        mode="number"
        onClick={goHangulMode}
      />
      <button className="cheon-key" onClick={() => insertChar(".")}>
        .
      </button>
      <button className="cheon-key" onClick={() => insertChar("0")}>
        0
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

import KeyboardControlKey from "./KeyboardControlKey";
import { useKeyboardInputContext } from "../input/KeyboardInputProvider";
import { useKeyboardSlotContext } from "../slots/KeyboardSlotProvider";
import { useKeyboardViewContext } from "../view/KeyboardViewContext";

// 기호 키 배열을 렌더링하고, 실제 입력/모드 전환은 Context 액션에 위임합니다.
export default function SymbolKeyboard() {
  const { insertChar, insertCharCycle, backspace } =
    useKeyboardInputContext();
  const { getSlotsForMode } = useKeyboardSlotContext();
  const { goHangulMode, goNumberMode, goSymbolMode } =
    useKeyboardViewContext();
  const modeSlots = getSlotsForMode("symbol");

  return (
    <div className="cheon-grid" data-cji-mode="symbol">
      {/* 1행: (빈칸) | @ | # | & | ⌫ */}
      <KeyboardControlKey
        type="empty"
        mode="symbol"
        position="row1col1"
        slot={modeSlots.row1col1}
        onInsertChar={insertChar}
      />
      <button className="cheon-key" onClick={() => insertChar("@")}>
        @
      </button>
      <button className="cheon-key" onClick={() => insertChar("#")}>
        #
      </button>
      <button className="cheon-key" onClick={() => insertChar("&")}>
        &
      </button>
      <button className="cheon-key cheon-key--func" onClick={backspace}>
        ⌫
      </button>

      {/* 2행: 123 | ( | ) | [ | ] */}
      <KeyboardControlKey
        type="number"
        mode="symbol"
        onClick={goNumberMode}
      />
      <button className="cheon-key" onClick={() => insertChar("(")}>
        (
      </button>
      <button className="cheon-key" onClick={() => insertChar(")")}>
        )
      </button>
      <button className="cheon-key" onClick={() => insertChar("[")}>
        [
      </button>
      <button className="cheon-key" onClick={() => insertChar("]")}>
        ]
      </button>

      {/* 3행: 기호 | { | } | "' | / */}
      <KeyboardControlKey
        type="symbol"
        mode="symbol"
        onClick={goSymbolMode}
      />
      <button className="cheon-key" onClick={() => insertChar("{")}>
        {"{"}
      </button>
      <button className="cheon-key" onClick={() => insertChar("}")}>
        {"}"}
      </button>
      <button
        className="cheon-key"
        onClick={() => insertCharCycle(['"', "'"])}
      >
        "'
      </button>
      <button className="cheon-key" onClick={() => insertChar("/")}>
        /
      </button>

      {/* 4행: 영타/한 | , | . | ?! | ↵ */}
      <KeyboardControlKey
        type="language"
        mode="symbol"
        onClick={goHangulMode}
      />
      <button className="cheon-key" onClick={() => insertChar(",")}>
        ,
      </button>
      <button className="cheon-key" onClick={() => insertChar(".")}>
        .
      </button>
      <button
        className="cheon-key"
        onClick={() => insertCharCycle(["?", "!"])}
      >
        ?!
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

import KeyboardControlKey from "./KeyboardControlKey";
import KeyboardSlotCell from "../slots/KeyboardSlotCell";
import { useKeyboardInputContext } from "../input/KeyboardInputProvider";
import { useKeyboardSlotContext } from "../slots/KeyboardSlotProvider";
import { useKeyboardViewContext } from "../view/KeyboardViewContext";

// 영문 3x4식 키 배열을 렌더링하고, shift 상태는 KeyboardView Context에서 가져옵니다.
export default function EnglishKeyboard() {
  const { insertChar, insertCharCycle, backspace, updateLastJamo } =
    useKeyboardInputContext();
  const { getSlotsForMode } = useKeyboardSlotContext();
  const {
    isUpper,
    toggleShift,
    goHangulMode,
    goNumberMode,
    goSymbolMode,
  } = useKeyboardViewContext();
  const modeSlots = getSlotsForMode("english");

  // 알파벳 cycle 입력 후 shift가 켜져 있으면 마지막 문자만 대문자로 보정합니다.
  const handleAlphaCycle = (chars) => {
    insertCharCycle(chars);

    if (isUpper) {
      updateLastJamo((lastJamo) => lastJamo.toUpperCase());
    }
  };

  const labelABC = isUpper ? "ABC" : "abc";
  const labelDEF = isUpper ? "DEF" : "def";
  const labelGHI = isUpper ? "GHI" : "ghi";
  const labelJKL = isUpper ? "JKL" : "jkl";
  const labelMNO = isUpper ? "MNO" : "mno";
  const labelPQRS = isUpper ? "PQRS" : "pqrs";
  const labelTUV = isUpper ? "TUV" : "tuv";
  const labelWXYZ = isUpper ? "WXYZ" : "wxyz";

  return (
    <div className="cheon-grid" data-cji-mode="english">
      {/* 1행: (빈칸) | ,?! | ABC | DEF | ⌫ */}
      <KeyboardControlKey
        type="empty"
        mode="english"
        position="row1col1"
        slot={modeSlots.row1col1}
        onInsertChar={insertChar}
      />
      <button
        className="cheon-key"
        onClick={() => insertCharCycle([",", "?", "!"])}
      >
        ,?!
      </button>
      <button
        className="cheon-key"
        onClick={() => handleAlphaCycle(["a", "b", "c"])}
      >
        {labelABC}
      </button>
      <button
        className="cheon-key"
        onClick={() => handleAlphaCycle(["d", "e", "f"])}
      >
        {labelDEF}
      </button>
      <button className="cheon-key cheon-key--func" onClick={backspace}>
        ⌫
      </button>

      {/* 2행: 123 | GHI | JKL | MNO | (빈칸) */}
      <KeyboardControlKey
        type="number"
        mode="english"
        onClick={goNumberMode}
      />
      <button
        className="cheon-key"
        onClick={() => handleAlphaCycle(["g", "h", "i"])}
      >
        {labelGHI}
      </button>
      <button
        className="cheon-key"
        onClick={() => handleAlphaCycle(["j", "k", "l"])}
      >
        {labelJKL}
      </button>
      <button
        className="cheon-key"
        onClick={() => handleAlphaCycle(["m", "n", "o"])}
      >
        {labelMNO}
      </button>
      <KeyboardSlotCell
        mode="english"
        position="row2col5"
        slot={modeSlots.row2col5}
        onInsertChar={insertChar}
      />

      {/* 3행: 기호 | PQRS | TUV | WXYZ | Shift */}
      <KeyboardControlKey
        type="symbol"
        mode="english"
        onClick={goSymbolMode}
      />
      <button
        className="cheon-key"
        onClick={() => handleAlphaCycle(["p", "q", "r", "s"])}
      >
        {labelPQRS}
      </button>
      <button
        className="cheon-key"
        onClick={() => handleAlphaCycle(["t", "u", "v"])}
      >
        {labelTUV}
      </button>
      <button
        className="cheon-key"
        onClick={() => handleAlphaCycle(["w", "x", "y", "z"])}
      >
        {labelWXYZ}
      </button>
      <button
        className={
          "cheon-key cheon-key--func" + (isUpper ? " cheon-key--shift-on" : "")
        }
        onClick={toggleShift}
      >
        ↑
      </button>

      {/* 4행: 영타/한 | (빈칸) | (빈칸) | SPACE | ↵ */}
      <KeyboardControlKey
        type="language"
        mode="english"
        onClick={goHangulMode}
      />
      <KeyboardSlotCell
        mode="english"
        position="row4col2"
        slot={modeSlots.row4col2}
        onInsertChar={insertChar}
      />
      <KeyboardSlotCell
        mode="english"
        position="row4col3"
        slot={modeSlots.row4col3}
        onInsertChar={insertChar}
      />
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

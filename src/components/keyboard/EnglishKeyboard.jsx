import KeyboardControlKey from "./KeyboardControlKey";
import KeyboardSlotCell from "./KeyboardSlotCell";

export default function EnglishKeyboard({
  isUpper,
  toggleShift,
  onAlphaCycle, // ['a','b','c'] 같은 소문자 배열
  onInsertChar,
  onInsertCharCycle, // 구두점용
  onBackspace,
  goHangulMode,
  goNumberMode,
  goSymbolMode,
  slots = {},
}) {
  const labelABC = isUpper ? "ABC" : "abc";
  const labelDEF = isUpper ? "DEF" : "def";
  const labelGHI = isUpper ? "GHI" : "ghi";
  const labelJKL = isUpper ? "JKL" : "jkl";
  const labelMNO = isUpper ? "MNO" : "mno";
  const labelPQRS = isUpper ? "PQRS" : "pqrs";
  const labelTUV = isUpper ? "TUV" : "tuv";
  const labelWXYZ = isUpper ? "WXYZ" : "wxyz";

  return (
    <div className="cheon-grid">
      {/* 1행: (빈칸) | ,?! | ABC | DEF | ⌫ */}
      <KeyboardControlKey
        type="empty"
        mode="english"
        slotName="controlTop"
        slot={slots.controlTop}
        onInsertChar={onInsertChar}
      />
      <button
        className="cheon-key"
        onClick={() => onInsertCharCycle([",", "?", "!"])}
      >
        ,?!
      </button>
      <button
        className="cheon-key"
        onClick={() => onAlphaCycle(["a", "b", "c"])}
      >
        {labelABC}
      </button>
      <button
        className="cheon-key"
        onClick={() => onAlphaCycle(["d", "e", "f"])}
      >
        {labelDEF}
      </button>
      <button className="cheon-key cheon-key--func" onClick={onBackspace}>
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
        onClick={() => onAlphaCycle(["g", "h", "i"])}
      >
        {labelGHI}
      </button>
      <button
        className="cheon-key"
        onClick={() => onAlphaCycle(["j", "k", "l"])}
      >
        {labelJKL}
      </button>
      <button
        className="cheon-key"
        onClick={() => onAlphaCycle(["m", "n", "o"])}
      >
        {labelMNO}
      </button>
      <KeyboardSlotCell
        mode="english"
        name="topRight"
        slot={slots.topRight}
        onInsertChar={onInsertChar}
      />

      {/* 3행: 기호 | PQRS | TUV | WXYZ | Shift */}
      <KeyboardControlKey
        type="symbol"
        mode="english"
        onClick={goSymbolMode}
      />
      <button
        className="cheon-key"
        onClick={() => onAlphaCycle(["p", "q", "r", "s"])}
      >
        {labelPQRS}
      </button>
      <button
        className="cheon-key"
        onClick={() => onAlphaCycle(["t", "u", "v"])}
      >
        {labelTUV}
      </button>
      <button
        className="cheon-key"
        onClick={() => onAlphaCycle(["w", "x", "y", "z"])}
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
        name="bottomLeft"
        slot={slots.bottomLeft}
        onInsertChar={onInsertChar}
      />
      <KeyboardSlotCell
        mode="english"
        name="bottomMiddle"
        slot={slots.bottomMiddle}
        onInsertChar={onInsertChar}
      />
      <button
        className="cheon-key cheon-key--space"
        onClick={() => onInsertChar(" ")}
      >
        SPACE
      </button>
      <button
        className="cheon-key cheon-key--enter"
        onClick={() => onInsertChar("\n")}
      >
        ↵
      </button>
    </div>
  );
}

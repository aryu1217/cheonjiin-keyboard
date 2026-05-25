import KeyboardControlKey from "./KeyboardControlKey";
import KeyboardSlotCell from "./KeyboardSlotCell";

export default function NumberKeyboard({
  onInsertChar,
  onBackspace,
  goHangulMode,
  goNumberMode,
  goSymbolMode,
  slots = {},
}) {
  return (
    <div className="cheon-grid">
      {/* 1행: (빈칸) | 1 | 2 | 3 | ⌫ */}
      <KeyboardControlKey
        type="empty"
        mode="number"
        slotName="controlTop"
        slot={slots.controlTop}
        onInsertChar={onInsertChar}
      />
      <button className="cheon-key" onClick={() => onInsertChar("1")}>
        1
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("2")}>
        2
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("3")}>
        3
      </button>
      <button className="cheon-key cheon-key--func" onClick={onBackspace}>
        ⌫
      </button>

      {/* 2행: 123 | 4 | 5 | 6 | (빈칸) */}
      <KeyboardControlKey
        type="number"
        mode="number"
        onClick={goNumberMode}
      />
      <button className="cheon-key" onClick={() => onInsertChar("4")}>
        4
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("5")}>
        5
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("6")}>
        6
      </button>
      <KeyboardSlotCell
        mode="number"
        name="rightTop"
        slot={slots.rightTop}
        onInsertChar={onInsertChar}
      />

      {/* 3행: 기호 | 7 | 8 | 9 | (빈칸) */}
      <KeyboardControlKey
        type="symbol"
        mode="number"
        onClick={goSymbolMode}
      />
      <button className="cheon-key" onClick={() => onInsertChar("7")}>
        7
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("8")}>
        8
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("9")}>
        9
      </button>
      <KeyboardSlotCell
        mode="number"
        name="rightMiddle"
        slot={slots.rightMiddle}
        onInsertChar={onInsertChar}
      />

      {/* 4행: 영타/한 | . | 0 | SPACE | ↵ */}
      <KeyboardControlKey
        type="language"
        mode="number"
        onClick={goHangulMode}
      />
      <button className="cheon-key" onClick={() => onInsertChar(".")}>
        .
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("0")}>
        0
      </button>
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

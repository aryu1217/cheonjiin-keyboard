import KeyboardControlKey from "./KeyboardControlKey";

export default function SymbolKeyboard({
  onInsertChar,
  onInsertCharCycle,
  onBackspace,
  goHangulMode,
  goNumberMode,
  goSymbolMode,
  slots = {},
}) {
  return (
    <div className="cheon-grid">
      {/* 1행: (빈칸) | @ | # | & | ⌫ */}
      <KeyboardControlKey
        type="empty"
        mode="symbol"
        slotName="controlTop"
        slot={slots.controlTop}
        onInsertChar={onInsertChar}
      />
      <button className="cheon-key" onClick={() => onInsertChar("@")}>
        @
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("#")}>
        #
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("&")}>
        &
      </button>
      <button className="cheon-key cheon-key--func" onClick={onBackspace}>
        ⌫
      </button>

      {/* 2행: 123 | ( | ) | [ | ] */}
      <KeyboardControlKey
        type="number"
        mode="symbol"
        onClick={goNumberMode}
      />
      <button className="cheon-key" onClick={() => onInsertChar("(")}>
        (
      </button>
      <button className="cheon-key" onClick={() => onInsertChar(")")}>
        )
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("[")}>
        [
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("]")}>
        ]
      </button>

      {/* 3행: 기호 | { | } | "' | / */}
      <KeyboardControlKey
        type="symbol"
        mode="symbol"
        onClick={goSymbolMode}
      />
      <button className="cheon-key" onClick={() => onInsertChar("{")}>
        {"{"}
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("}")}>
        {"}"}
      </button>
      <button
        className="cheon-key"
        onClick={() => onInsertCharCycle(['"', "'"])}
      >
        "'
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("/")}>
        /
      </button>

      {/* 4행: 영타/한 | , | . | ?! | ↵ */}
      <KeyboardControlKey
        type="language"
        mode="symbol"
        onClick={goHangulMode}
      />
      <button className="cheon-key" onClick={() => onInsertChar(",")}>
        ,
      </button>
      <button className="cheon-key" onClick={() => onInsertChar(".")}>
        .
      </button>
      <button
        className="cheon-key"
        onClick={() => onInsertCharCycle(["?", "!"])}
      >
        ?!
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

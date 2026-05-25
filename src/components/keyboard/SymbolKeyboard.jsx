import KeyboardControlKey from "./KeyboardControlKey";

export default function SymbolKeyboard({
  onInsertChar,
  onInsertCharCycle,
  onBackspace,
  goHangulMode,
  goNumberMode,
  goSymbolMode,
}) {
  return (
    <div className="cheon-grid">
      {/* 1행: (빈칸) | @ | # | & | ⌫ */}
      <KeyboardControlKey type="empty" />
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
      <KeyboardControlKey type="number" onClick={goNumberMode} />
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
      <KeyboardControlKey type="symbol" onClick={goSymbolMode} />
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
      <KeyboardControlKey type="language" onClick={goHangulMode} />
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

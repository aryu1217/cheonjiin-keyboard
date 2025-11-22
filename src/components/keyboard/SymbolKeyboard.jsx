export default function SymbolKeyboard({
  onInsertChar,
  onBackspace,
  goHangulMode,
  goNumberMode,
}) {
  return (
    <div className="cheon-grid">
      {/* 1행: 123 | @ | # | & | ⌫ */}
      <button className="cheon-key cheon-key--func" onClick={goNumberMode}>
        123
      </button>
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

      {/* 2행: ( ) [ ] / */}
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
      <button className="cheon-key" onClick={() => onInsertChar("/")}>
        /
      </button>

      {/* 3행: { } " ' ? */}
      <button className="cheon-key" onClick={() => onInsertChar("{")}>
        {"{"}
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("}")}>
        {"}"}
      </button>
      <button className="cheon-key" onClick={() => onInsertChar('"')}>
        "
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("'")}>
        '
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("?")}>
        ?
      </button>

      {/* 4행: 한글 | , | . | ! | ↵ */}
      <button className="cheon-key cheon-key--func" onClick={goHangulMode}>
        한글
      </button>
      <button className="cheon-key" onClick={() => onInsertChar(",")}>
        ,
      </button>
      <button className="cheon-key" onClick={() => onInsertChar(".")}>
        .
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("!")}>
        !
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

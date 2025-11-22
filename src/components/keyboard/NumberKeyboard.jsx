export default function NumberKeyboard({
  onInsertChar,
  onBackspace,
  goHangulMode,
}) {
  return (
    <div className="cheon-grid">
      {/* 1행: 한/가 | 1 | 2 | 3 | ⌫ */}
      <button className="cheon-key cheon-key--func" onClick={goHangulMode}>
        한/가
      </button>
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

      {/* 2행 */}
      <div className="cheon-key cheon-key--empty" />
      <button className="cheon-key" onClick={() => onInsertChar("4")}>
        4
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("5")}>
        5
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("6")}>
        6
      </button>
      <div className="cheon-key cheon-key--empty" />

      {/* 3행 */}
      <div className="cheon-key cheon-key--empty" />
      <button className="cheon-key" onClick={() => onInsertChar("7")}>
        7
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("8")}>
        8
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("9")}>
        9
      </button>
      <div className="cheon-key cheon-key--empty" />

      {/* 4행: (빈) | SPACE | 0 | . | ↵ */}
      <div className="cheon-key cheon-key--empty" />
      <button
        className="cheon-key cheon-key--space"
        onClick={() => onInsertChar(" ")}
      >
        SPACE
      </button>
      <button className="cheon-key" onClick={() => onInsertChar("0")}>
        0
      </button>
      <button className="cheon-key" onClick={() => onInsertChar(".")}>
        .
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

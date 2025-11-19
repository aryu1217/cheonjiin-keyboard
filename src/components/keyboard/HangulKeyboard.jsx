// src/components/keyboard/HangulKeyboard.jsx

export default function HangulKeyboard({
  onStroke,
  onConsonantGroup,
  onInsertChar,
  onInsertCharCycle,
  onBackspace,
  goEnglishMode,
  goNumberMode,
  goSymbolMode,
}) {
  return (
    <div className="cheon-grid">
      {/* 1행 : 123 / ㅣ / · / ㅡ / ⌫ */}
      <button className="cheon-key cheon-key--func" onClick={goNumberMode}>
        123
      </button>
      <button
        className="cheon-key cheon-key--stroke"
        onClick={() => onStroke("I")}
      >
        ㅣ
      </button>
      <button
        className="cheon-key cheon-key--stroke"
        onClick={() => onStroke("D")}
      >
        ·
      </button>
      <button
        className="cheon-key cheon-key--stroke"
        onClick={() => onStroke("H")}
      >
        ㅡ
      </button>
      <button className="cheon-key cheon-key--func" onClick={onBackspace}>
        ⌫
      </button>

      {/* 2행 : 기호 / ㄱㅋ / ㄴㄹ / ㄷㅌ / ?! */}
      <button className="cheon-key cheon-key--func" onClick={goSymbolMode}>
        기호
      </button>
      <button
        className="cheon-key"
        onClick={() => onConsonantGroup(["ㄱ", "ㅋ", "ㄲ"])}
      >
        ㄱㅋ
      </button>
      <button
        className="cheon-key"
        onClick={() => onConsonantGroup(["ㄴ", "ㄹ"])}
      >
        ㄴㄹ
      </button>
      <button
        className="cheon-key"
        onClick={() => onConsonantGroup(["ㄷ", "ㅌ", "ㄸ"])}
      >
        ㄷㅌ
      </button>
      <button
        className="cheon-key"
        onClick={() => onInsertCharCycle(["?", "!"])}
      >
        ?!
      </button>

      <button className="cheon-key cheon-key--func" onClick={goEnglishMode}>
        영타
      </button>
      <button
        className="cheon-key"
        onClick={() => onConsonantGroup(["ㅂ", "ㅍ", "ㅃ"])}
      >
        ㅂㅍ
      </button>
      <button
        className="cheon-key"
        onClick={() => onConsonantGroup(["ㅅ", "ㅎ", "ㅆ"])}
      >
        ㅅㅎ
      </button>
      <button
        className="cheon-key"
        onClick={() => onConsonantGroup(["ㅈ", "ㅊ", "ㅉ"])}
      >
        ㅈㅊ
      </button>
      <div className="cheon-key cheon-key--empty" />

      {/* 4행 : 한 / . , / ㅇㅁ / SPACE / ↵ */}
      <button className="cheon-key cheon-key--func">한</button>
      <button
        className="cheon-key"
        onClick={() => onInsertCharCycle([".", ","])}
      >
        . ,
      </button>
      <button
        className="cheon-key"
        onClick={() => onConsonantGroup(["ㅇ", "ㅁ"])}
      >
        ㅇㅁ
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

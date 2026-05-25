import KeyboardControlKey from "./KeyboardControlKey";

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
      {/* 1행 : (빈칸) / ㅣ / · / ㅡ / ⌫ */}
      <KeyboardControlKey type="empty" />
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

      {/* 2행 : 123 / ㄱㅋ / ㄴㄹ / ㄷㅌ / ?! */}
      <KeyboardControlKey type="number" onClick={goNumberMode} />
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

      {/* 3행 : 기호 / ㅂㅍ / ㅅㅎ / ㅈㅊ / (빈칸) */}
      <KeyboardControlKey type="symbol" onClick={goSymbolMode} />
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

      {/* 4행 : 영타/한 / . , / ㅇㅁ / SPACE / ↵ */}
      <KeyboardControlKey type="language" onClick={goEnglishMode} />
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

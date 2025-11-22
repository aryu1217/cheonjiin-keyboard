export default function EnglishKeyboard({
  isUpper,
  toggleShift,
  onAlphaCycle, // ['a','b','c'] 같은 소문자 배열
  onInsertChar,
  onInsertCharCycle, // 구두점용
  onBackspace,
  goHangulMode,
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
    <div className="cheon-grid cheon-grid--english">
      {/* 1행: ,?! | ABC | DEF | ⌫ */}
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

      {/* 2행: GHI | JKL | MNO | ↵ */}
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
      <button
        className="cheon-key cheon-key--enter"
        onClick={() => onInsertChar("\n")}
      >
        ↵
      </button>

      {/* 3행: PQRS | TUV | WXYZ | Shift */}
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

      {/* 4행: 한/영 | SPACE | (빈) | (빈) */}
      <button className="cheon-key cheon-key--func" onClick={goHangulMode}>
        한/영
      </button>
      <button
        className="cheon-key cheon-key--space"
        onClick={() => onInsertChar(" ")}
      >
        SPACE
      </button>
      <div className="cheon-key cheon-key--empty" />
      <div className="cheon-key cheon-key--empty" />
    </div>
  );
}

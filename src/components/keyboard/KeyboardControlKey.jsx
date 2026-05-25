import KeyboardSlotCell from "./KeyboardSlotCell";

const CONTROL_KEY_LABEL = {
  number: "123",
  symbol: "기호",
  language: "영타/한",
};

// 모든 키보드 모드에서 왼쪽 제어열을 같은 순서와 라벨로 유지하기 위한 공통 셀입니다.
export default function KeyboardControlKey({
  type,
  mode,
  slot,
  slotName,
  onClick,
  onInsertChar,
}) {
  if (type === "empty") {
    return (
      <KeyboardSlotCell
        mode={mode}
        name={slotName}
        slot={slot}
        onInsertChar={onInsertChar}
      />
    );
  }

  return (
    <button
      type="button"
      className="cheon-key cheon-key--func"
      data-cji-key
      data-cji-mode={mode}
      data-cji-action={type}
      onClick={onClick}
    >
      {CONTROL_KEY_LABEL[type]}
    </button>
  );
}
